import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// POST : SignUp API
const signupAPI = async (user_data: any) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/user/register`,
      user_data
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else {
      console.error("An unexpected error occurred : ", error);
    }
  }
};

// POST : Login API
const loginAPI = async (login_data: any) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/user/login`,
      login_data
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else {
      console.error("An unexpected error occurred : ", error);
    }
  }
};

export { signupAPI, loginAPI };
