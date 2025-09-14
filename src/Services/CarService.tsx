import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// GET : Fetch All Active Cars API
const getAllActiveCarAPI = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/car/get-all-active`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else {
      console.error("An unexpected error occurred : ", error);
    }
  }
};

export { getAllActiveCarAPI };
