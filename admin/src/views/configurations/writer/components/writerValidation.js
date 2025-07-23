import validator from "validator";

const WriterValidation = async (values, image) => {
  try {
    let errorObject = {};

    if (!image) {
      errorObject.errorImage = `Please select a image`;
    }

    if (validator.isEmpty(values.writer_name, { ignore_whitespace: true })) {
      errorObject.writer_name = `Writer name is required.`;
    } else if (!validator.isLength(values.writer_name, 3, 60)) {
      errorObject.writer_name = `The writer name must be between 3 and 60 characters in length.`;
    }

    if (validator.isEmpty(values.email, { ignore_whitespace: true })) {
      errorObject.email = `Email is required.`;
    } else if (!validator.isEmail(values.email)) {
      errorObject.email = `Invalid email format.`;
    } else if (!validator.isLength(values.email, 3, 60)) {
      errorObject.email = `The Email must be between 3 and 60 characters in length.`;
    }

    if (validator.isEmpty(values.display_name, { ignore_whitespace: true })) {
      errorObject.display_name = `Display name is required.`;
    } else if (!validator.isLength(values.display_name, 3, 60)) {
      errorObject.display_name = `The Display name must be between 3 and 60 characters in length.`;
    }

    if (validator.isEmpty(values.writer_alt, { ignore_whitespace: true })) {
      errorObject.writer_alt = `Writer alt is required.`;
    } else if (!validator.isLength(values.writer_alt, 3, 60)) {
      errorObject.writer_alt = `The writer alt must be between 3 and 60 characters in length.`;
    }

    if (Object.keys(errorObject).length === 0) {
      return { errorStatus: false };
    } else {
      return { ...errorObject, errorStatus: true };
    }
  } catch (error) {
    // console.log(`validation error : `, error.message);
    return { errorStatus: true };
  }
};

export default WriterValidation;
