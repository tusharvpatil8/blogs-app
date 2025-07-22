import React, { useEffect, useRef, useState } from "react";
import {
  formatDateToDDMMMYYYY,
  formatDateToMMDDYY,
} from "../../utils/functions/dateFormat";
import { Calendar } from "../DatePicker";
import { FaCalendar } from "react-icons/fa";

const DateSelect = (props) => {
  const {
    label,
    value,
    onChange,
    placeholder = "",
    className,
    format,
    disabled = false,
    error,
    errorMessage,
    ...rest
  } = props;
  const outSideRef = useRef(null);
  const datePickerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [value]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        outSideRef.current &&
        !outSideRef.current.contains(event.target) &&
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div>
      <label
        className={`text-[18px] ${error ? "text-accentRed" : "text-dark"}  `}
      >
        {label}
      </label>
      <div className="relative font-outfit bg-white">
        <div className=" absolute left-3 top-[10px] z-10 ">
          <FaCalendar className="text-[#003A7B]" size={20} />
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${className} relative text-[#474747] border-[1px] border-[#003A7B] py-[15 px] mt-[5px] ps-5 w-full cursor-default rounded-[5px] flex items-center text-left 
          ${error ? "border border-accentRed" : "border border-dark"} ${!disabled ? "focus:outline-2 focus:border-2 focus:ring-[#003A7B] focus-within:ring-[#003A7B] focus-within:border-[#003A7B]}  focus:border-[#003A7B] " : "bg-[#F3F4F6]"} focus:outline-none sm:text-sm sm:leading-6`}
          style={{ height: "40px" }}
        >
          {/* */}
          {value ? (
            <div className={`rounded-md text-sm pl-[20px] w-full block truncate  text-[#003A7B]  font-normal outline-none md:text-base ${!disabled ? "text-black mr-8 3xl:mr-0 " : "text-slate-400  mr-0"}`}>
              {format === "yyyy-mm-dd"
                ? formatDateToMMDDYY(value).toString()
                : formatDateToDDMMMYYYY(value).toString()}
            </div>
          ) : (
            <div className={`rounded-md pl-[20px] w-full block truncate text-base text-[#ABABAB]  font-normal outline-none ${!disabled ? "mr-8 3xl:mr-0 " : "text-slate-400 mr-0"}`}>
              {placeholder}
            </div>
          )}
          {/* </div> */}
        </button>
        {!disabled && isOpen && (
          <div
            ref={outSideRef}
            className="absolute z-10 bg-white w-full rounded-md focus:outline-none"
          >
            <ul
              ref={datePickerRef}
              className="absolute textarea mt-[6px] z-10 border border-dark w-[300px] overflow-auto rounded-md bg-white py-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <div className="bg-white p-4 ">
                <Calendar
                  value={value}
                  onChange={onChange}
                  {...rest}
                />
              </div>
            </ul>
          </div>
        )}
      </div>
      {error && (
        <span className="text-accentRed mt-8 text-[12px]">{errorMessage}</span>
      )}
    </div>
  );
};
export default DateSelect;
