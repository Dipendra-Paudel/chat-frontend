const formValidator = (value, validation, validateAll = true) => {
  let error = "";

  const label =
    validation[0].toUpperCase() +
    validation.slice(1, validation.length).toLowerCase();

  // Check if value is empty
  if (value === "") {
    error = `${label} is required`;
  } else if (
    value.trim() === "" &&
    validation !== "password" &&
    validation !== "confirmPassword"
  ) {
    error = `${label} is required`;
  } else if (validateAll) {
    // validation for first name and last name
    if (validation === "firstName" || validation === "lastName") {
      if (value.trim().length < 3) {
        return `${label} must be at least 3 characters long`;
      } else if (value.trim().length > 100) {
        return `${label} cannot exceed 100 characters`;
      } else if (!/^[0-9a-zA-Z_ ]+$/.test(value)) {
        return `${label} cannot contain any special characters`;
      }
    }

    // validation for password
    if (validation === "password") {
      if (value.length === 0) {
        error = `${label} is required`;
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      } else {
        let arr = [];
        if (!/\d/.test(value)) {
          arr.push("number");
        }
        if (!/[A-Z]/.test(value)) {
          arr.push("capital letter");
        }
        if (!/[a-z]/.test(value)) {
          arr.push("small letter");
        }
        if (!/[!@#$%^&*()_+\-={}[\]\\|'"/?.>,<`~]/.test(value)) {
          arr.push("special character");
        }

        if (arr.length > 0) {
          let errorName = arr.join(", ");
          if (arr.length > 1) {
            const index = errorName.lastIndexOf(",");
            errorName =
              errorName.slice(0, index) +
              " and" +
              errorName.slice(index + 1, errorName.length);
          }
          error = `Password must contain at least 1 ${errorName}`;
        }
      }
    }

    // validation for confirm password
    else if (validation === "confirmPassword") {
      if (value.length === 0) {
        error = `${label} is required`;
      }
    }

    // validation for email
    else if (validation === "email") {
      if (!value.match(/^\w+([._]\w+)?@\w+\.\w+(\.\w+)?$/gi)) {
        error = "Invalid Email Address";
      }
    }
  }

  return error;
};

export default formValidator;
