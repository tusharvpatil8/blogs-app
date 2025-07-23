import validator from "validator";

const BlogCategoryValidation = async (values) => {
  try {
    let errorObject = {};

    if (validator.isEmpty(values.name, { ignore_whitespace: true })) {
      errorObject.name = `Name is required.`;
    } else if (!validator.isLength(values.name, 3, 60)) {
      errorObject.name = `The name must be between 3 and 60 characters in length.`;
    }
    if (validator.isEmpty(values.slug_url, { ignore_whitespace: true })) {
      errorObject.slug_url = `Slug url is required.`;
    } else if (!validator.isLength(values.slug_url, 3, 60)) {
      errorObject.slug_url = `The slug url must be between 3 and 60 characters in length.`;
    }

    if (Object.keys(errorObject).length === 0) {
      return { errorStatus: false };
    } else {
      return { ...errorObject, errorStatus: true };
    }
  } catch (error) {
    // console.log(`error : `, error.message);
    return { errorStatus: true };
  }
};

export default BlogCategoryValidation;
