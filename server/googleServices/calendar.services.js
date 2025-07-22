const { google } = require("googleapis");
const dotenv = require("dotenv");
const { setCalendarAuthTokens } = require("./googleAuth.services"); 

const appointmentService = require("../services/appointment.services"); 
const createError = require("http-errors");
const dayjs = require("dayjs");

const getAllAppointments = async (userId) => {
  try {
    // console.log("userId", userId);
    const calendarAuth = await setCalendarAuthTokens(userId);
    const calendar = calendarAuth.calendar;
    const response = await calendar.events.list({
      calendarId: "primary", // Calendar ID
      timeMin: new Date().toISOString(), // Start time (now)
      // maxResults: 10, // Maximum number of events
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items;
    return events;
  } catch (error) {
    throw error;
  }
};

const createAppointment = async (userId, payload, idArray) => {
  try {
    console.log("scheduled", idArray);
    // console.log("appointment creation", userId);
    const { calendar, oauth2Client } = await setCalendarAuthTokens(userId);

    async function findEvent(calendarId, eventSummary, startTime) {
      try {
        const response = await calendar.events.list({
          calendarId: calendarId,
          q: eventSummary, // Search for events with the given summary
          timeMin: startTime, // Start time of the event
          timeMax: dayjs(startTime)
            .add(1, "day")
            .format("YYYY-MM-DDTHH:mm:ssZ"),
        });

        return response.data.items.find(
          (event) =>
            event.summary === eventSummary && event.start.dateTime === startTime
        );
      } catch (error) {
        console.error("Error finding event: ", error);
      }
    }
    // Map weekday names to RRULE format
    const daysOfWeek = {
      monday: "MO",
      tuesday: "TU",
      wednesday: "WE",
      thursday: "TH",
      friday: "FR",
      saturday: "SA",
      sunday: "SU",
    };

    // Function to get the next occurrence of a specific weekday

    // Function to create the recurring event
    const { dentistId, timeSlots, weekDay, date, type } = payload;
    console.log("payload", payload);
    console.log("type", type);

    let dateValue;
    let i = 0;

    if (type === undefined) {
      payload?.forEach(async (appointment) => {
        i === 0 ? i : (i = i + 1);
        console.log("schedule", i, idArray);

        let response = [];
        dateValue = new dayjs(appointment?.date).format("YYYY-MM-DD");
        console.log("dateValue", dateValue);
        for (const timeSlot of appointment?.timeSlots) {
          const startTime = timeSlot.from;
          const endTime = timeSlot.to;

          const event = {
            summary: "Availability For Dentist",
            description: `Availability for dentist`,
            start: {
              dateTime: `${dateValue}T${startTime}:00+05:30`,
              timeZone: "Asia/Kolkata",
            },
            end: {
              dateTime: `${dateValue}T${endTime}:00+05:30`,
              timeZone: "Asia/Kolkata",
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          try {
            const existingEvent = await findEvent(
              "primary",
              event.summary,
              event.start.dateTime
            );

            if (existingEvent) {
              // Update the existing event
              const result = await calendar.events.update({
                calendarId: "primary",
                eventId: existingEvent.id,
                resource: event,
              });
              await appointmentService.setGoogleId(idArray[i], result.data.id);

              console.log("Event updated: %s", existingEvent.htmlLink);
              response.push(result);
            } else {
              // Create a new event
              const result = await calendar.events.insert({
                calendarId: "primary",
                resource: event,
              });

              await appointmentService.setGoogleId(idArray[i], result.data.id);

              console.log("Event created: %s", result?.data);
              response.push(result);
              i++;
            }
          } catch (error) {
            console.error("Error creating event: ", error);
          }
        }
        return response;
      });
    } else {
      function getNextWeekdayDate(weekday) {
        let dateValue = dayjs();
        while (
          dateValue?.format("dddd")?.toLowerCase() !== weekday?.toLowerCase()
        ) {
          dateValue = dateValue?.add(1, "day");
        }
        return dateValue.format("YYYY-MM-DD");
      }
      dateValue = getNextWeekdayDate(weekDay);
      let response = [];

      for (const timeSlot of timeSlots) {
        const startTime = timeSlot.from;
        const endTime = timeSlot.to;

        const event = {
          summary: "Availability For Dentist",
          description: `Availability for dentist`,
          start: {
            dateTime: `${dateValue}T${startTime}:00+05:30`,
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: `${dateValue}T${endTime}:00+05:30`,
            timeZone: "Asia/Kolkata",
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
        };

        if (type === "weekDay") {
          const rruleDay = daysOfWeek[weekDay.toLowerCase()];
          if (!rruleDay) {
            throw new Error("Invalid weekDay provided");
          }
          event.recurrence = [`RRULE:FREQ=WEEKLY;BYDAY=${rruleDay}`];
        }

        try {
          const existingEvent = await findEvent(
            "primary",
            event.summary,
            event.start.dateTime
          );

          if (existingEvent) {
            console.log("event found", existingEvent);
            // Update the existing event
            const result = await calendar.events.update({
              calendarId: "primary",
              eventId: existingEvent.id,
              resource: event,
            });

            console.log("idArray", idArray[i], existingEvent.id);
            console.log("Event created: %s", result);
            await appointmentService.setGoogleId(idArray[i], result.data.id);

            console.log("Event updated: %s", existingEvent.htmlLink);
            response.push(result);
          } else {
            // Create a new event
            const result = await calendar.events.insert({
              calendarId: "primary",
              resource: event,
            });
            console.log("idArray", idArray[i], result.data);
            console.log("Event created: %s", result);

            await appointmentService.setGoogleId(idArray[i], result.data.id);

            response.push(result);
          }
        } catch (error) {
          console.error("Error creating event: ", error);
        }
      }
      return response;
    }
  } catch (error) {
    throw error;
  }
};

const deleteAppointment = async (userId, eventId) => {
  try {
    // const userId = res.locals.userId;
    const { calendar } = await setCalendarAuthTokens(userId);

    // const eventId = req.params.id;

    const deleted = await calendar.events.delete({
      calendarId: "primary", // Calendar ID
      eventId,
    });
    console.log("deleted event", eventId, deleted);
    return deleted;
  } catch (error) {
    throw error;
  }
};

const excludeSingleOccurrence = async (authClient, eventId, occurrences) => {
  {
    const calendar = google.calendar({ version: "v3", auth: authClient });

    // Iterate over each occurrence to exclude
    for (const occurrence of occurrences) {
      const { startTime } = occurrence;

      // Mark the occurrence as deleted by setting its status to "cancelled"
      await calendar.events.patch({
        calendarId: "primary",
        eventId: eventId,
        sendUpdates: "all",
        resource: {
          status: "cancelled",
          start: { dateTime: startTime },
        },
      });

      console.log(`Occurrence at ${startTime} excluded successfully.`);
    }
  }
};

module.exports = {
  getAllAppointments,
  createAppointment,
  deleteAppointment,
  excludeSingleOccurrence,
  deleteAppointment,
};
