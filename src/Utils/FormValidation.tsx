const signupFormValidation = (name: string, value: string) => {
  switch (name) {
    case "name":
      if (value.length === 0) return "Name is required.";
      return "";

    case "email":
      if (value.length === 0) return "Email is required.";
      // Email validation regex
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Email is invalid.";
      }
      return "";

    case "password":
      if (value.length === 0) return "Password is required.";
      // Password validation regex
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
          value
        )
      ) {
        return "Password must be 8-15 characters with an uppercase, a lowercase, a number and a special character.";
      }
      return "";

    default:
      return "";
  }
};

const loginFormValidation = (name: string, value: string) => {
  switch (name) {
    case "email":
      if (value.length === 0) return "Email is required.";
      // Email regex validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email is invalid.";
      return "";

    case "password":
      if (value.length === 0) return "Password is required.";
      // Password regex validation
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
          value
        )
      )
        return "Password must be 8-15 characters with an uppercase, a lowercase, a number and a special character.";

      return "";

    default:
      return "";
  }
};

export { signupFormValidation, loginFormValidation };
