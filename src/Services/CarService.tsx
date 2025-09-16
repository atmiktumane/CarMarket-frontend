import axios from "axios";
import type { CarDetailsType } from "../Pages/BuyerPage";
import { errorNotification } from "../Utils/NotificationService";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Buyer - GET : Fetch All Active Cars API
const getAllActiveCarAPI = async (search?: string) => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/car/get-all-active`, {
      params: { search }, // attaches ?search=value only if provided
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else {
      console.error("An unexpected error occurred : ", error);
    }
  }
};

// Seller - GET : Fetch All Cars associated with Particular User
const getAllCarsOfUserAPI = async (user_id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/car/get-all/${user_id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else {
      console.error("An unexpected error occurred : ", error);
    }
  }
};

// Seller - PUT : update car
const updateCarAPI = async (car_data: CarDetailsType) => {
  try {
    const response = await axios.put(`${apiUrl}/api/v1/car/update`, car_data);
    return response.data;
  } catch (error: any) {
    errorNotification("Error", "Failed to update car data");

    console.error("An unexpected error occurred : ", error);
  }
};

// Seller - POST : add car
const addCarAPI = async (user_id: string, car_data: CarDetailsType) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/car/add/${user_id}`,
      car_data
    );

    return response.data;
  } catch (error: any) {
    errorNotification("Error", "Error while adding car");

    console.error("An unexpected error occurred : ", error);
  }
};

// Seller - DELETE : delete car
const deleteCarAPI = async (car_id: string) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/api/v1/car/delete/${car_id}`
    );

    return response.data;
  } catch (error: any) {
    errorNotification("Error", "Error in deleting car record");
    console.error("An unexpected error occurred : ", error);
  }
};

// Admin - GET : get all cars
const getAllCarsAPI = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/car/get-all`);

    return response.data;
  } catch (error) {
    errorNotification("Error", "Error while Fetching All Cars");

    console.error("An unexpected error occurred : ", error);
  }
};

// Admin - GET : fetch analytics data
const getAnalyticsAPI = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/car/analytics`);

    return response.data;
  } catch (error: any) {
    errorNotification("Error", "Error while fetching Analytics data");

    console.error("An unexpected error occurred : ", error);
  }
};

export {
  getAllActiveCarAPI,
  getAllCarsOfUserAPI,
  updateCarAPI,
  addCarAPI,
  deleteCarAPI,
  getAllCarsAPI,
  getAnalyticsAPI,
};
