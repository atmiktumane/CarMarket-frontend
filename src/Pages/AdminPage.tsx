import { IoAnalytics, IoCarSportOutline } from "react-icons/io5";
import { Header } from "../Components/Header";
import { LuIndianRupee } from "react-icons/lu";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaToggleOn } from "react-icons/fa";
import { BarChart } from "../Components/Charts/BarChart";
import { PieChart } from "../Components/Charts/PieChart";
import { Button, LoadingOverlay, Modal } from "@mantine/core";
import { deleteCarAPI, getAllCarsAPI } from "../Services/CarService";
import type { CarDetailsType } from "./BuyerPage";
import {
  calculateActiveCarsPercentage,
  formatCurrencyInr,
  formatTextToCapitalize,
} from "../Utils/Utilities";
import { successNotification } from "../Utils/NotificationService";

export const AdminPage = () => {
  const formData = {
    id: "",
    name: "",
    model: "",
    description: "",
    price: 0,
    first_purchase_year: 2025,
    createdAt: "",
    mileage: 0,
    location: "",
    condition: "Good",
    status: "ACTIVE",
    userId: "",
  };

  // State : to manage Admin Tabs
  const [tabs, setTabs] = useState({
    overview: true,
    all_listings: false,
    analytics: false,
  });

  // State : to manage Loader
  const [loader, setLoader] = useState<boolean>(false);

  // State : to store All Cars list
  const [carList, setCarList] = useState<CarDetailsType[]>([]);

  // State : to store TotalListing & ActiveListing of cars
  const [listings, setListings] = useState<{ [key: string]: number }>({
    totalListings: 0,
    activeListings: 0,
    totalPrice: 0,
    averagePrice: 0,
  });

  // State : to store one Car Details
  const [carDetails, setCarDetails] = useState<CarDetailsType>(formData);

  // console.log("carDetails : ", carDetails);

  // State : to manage delete car modal
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  // Analytics Data - Car Brand/Model
  const carBrandData = [
    { carName: "Honda", count: 12 },
    { carName: "Toyota", count: 8 },
    { carName: "Suzuki", count: 5 },
    { carName: "Tata", count: 15 },
    { carName: "Hyundai", count: 20 },
    { carName: "Renault", count: 4 },
  ];

  // Analytics Data - Car Status
  const statusData = [
    { key: "active", count: 10 },
    { key: "inactive", count: 3 },
  ];

  // Analytics Data - Car Conditions
  const carConditionData = [
    { carName: "Excellent", count: 12 },
    { carName: "Very Good", count: 8 },
    { carName: "Good", count: 5 },
    { carName: "Fair", count: 15 },
  ];

  const getAllCarsFunction = async () => {
    // Show Loader
    setLoader(true);

    try {
      const response = await getAllCarsAPI();

      console.log("Response : ", response);

      // Store Car List
      setCarList(response);

      // Hide Loader
      setLoader(false);
    } catch (error) {
      // Hide Loader
      setLoader(false);
    }
  };

  // Handle Delete Car
  const handleDeleteCar = async () => {
    // Show Loader
    setLoader(true);

    try {
      const response = await deleteCarAPI(carDetails?.id);
      // console.log("Response : ", response.message);

      // Reset All variables
      setCarDetails(formData);

      // Close Delete Modal
      setDeleteModal(false);

      // Fetch All car list
      getAllCarsFunction();

      // Hide Loader
      setLoader(false);

      // Show Success Modal
      successNotification("Success", response?.message);
    } catch (error) {
      // Hide Loader
      setLoader(false);
    }
  };

  const renderCarList = carList.map((item: CarDetailsType, index: number) => {
    return (
      <div
        key={index}
        className="w-full flex gap-3 p-2 items-center text-xs border-b-1 border-slate-300"
      >
        {/* Col 1 : Image */}
        <div className="w-1/5">
          <img
            src="/bmw_img.jpeg"
            alt="car img"
            className="w-20 h-12 rounded-lg"
          />
        </div>

        {/* Col 2 : Car Details */}
        <div className="w-1/5">
          <p className="font-semibold">{item.model}</p>
          <p className="text-slate-600 my-1">
            {item.first_purchase_year} &bull; {item.mileage} mileage
          </p>
          <p className="text-slate-600">{item.location}</p>
        </div>

        {/* Col 3 : Price */}
        <p className="w-1/5 font-semibold">₹{formatCurrencyInr(item.price)}</p>

        {/* Col 4 : Status */}
        <div className="w-1/5">
          <p
            className={`w-fit px-3 py-1 font-medium text-white rounded-lg ${
              item.status === "ACTIVE" ? "bg-emerald-700" : "bg-yellow-700"
            } `}
          >
            {formatTextToCapitalize(item.status)}
          </p>
        </div>

        {/* Col 5 : Actions - Toggle + Delete */}
        <div className="w-1/5 flex items-center gap-3">
          {/* Toggle */}
          <div className="w-fit px-2 py-1 border border-slate-300 rounded-lg">
            <FaToggleOn className="text-2xl text-emerald-700" />
          </div>

          {/* Delete */}
          <div
            onClick={() => {
              // Store car details
              setCarDetails(item);

              // Open Delete Modal
              setDeleteModal(true);
            }}
            className="w-fit px-3 py-2 bg-red-700 rounded-lg cursor-pointer"
          >
            <RiDeleteBin6Line className="text-lg text-white" />
          </div>
        </div>
      </div>
    );
  });

  // Car List change workflow
  useEffect(() => {
    if (carList.length > 0) {
      let activeCars = carList.filter((item) => item.status === "ACTIVE");

      // console.log("activeCars : ", activeCars.length);

      // Total price of all cars
      const sum = carList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      );

      // console.log("SUM : ", sum);

      setListings({
        ...listings,
        activeListings: activeCars?.length,
        totalListings: carList?.length,
        totalPrice: sum,
        averagePrice: sum / carList?.length, // AveragePrice = (sum of all price / total)
      });
    }
  }, [carList]);

  // PageLoad Workflow
  useEffect(() => {
    getAllCarsFunction();
  }, []);

  return (
    <>
      <div className="min-h-[100vh] bg-slate-100/40 flex flex-col">
        <Header />

        {/* Admin Page Content */}
        <div className="flex flex-col px-10 py-10 gap-10">
          {/* Row 1 - Title */}
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">Admin Dashboard</p>
            <p className="text-sm font-medium text-slate-500">
              Manage platform listings and monitor activity
            </p>
          </div>

          {/* Row 2 - Info Cards */}
          <div className="w-full flex items-center gap-5 text-sm">
            {/* Col 1 - Total Listings */}
            <div className="w-1/4 p-4 border border-slate-300 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-purple-400">Total Listings</p>

                <IoCarSportOutline className="text-purple-600" />
              </div>

              <p className="text-lg font-semibold text-purple-600">
                {listings.totalListings}
              </p>
              <p className="font-medium text-xs text-slate-500">
                {listings.activeListings} active,{" "}
                {listings.totalListings - listings.activeListings} inactive
              </p>
            </div>

            {/* Col 2 - Active Listings */}
            <div className="w-1/4 p-4 border border-slate-300 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-purple-400">Active Listings</p>

                <IoAnalytics className="text-purple-600" />
              </div>

              <p className="text-lg font-semibold text-purple-600">
                {listings.activeListings}
              </p>
              <p className="font-medium text-xs text-slate-500">
                {calculateActiveCarsPercentage(
                  listings.activeListings,
                  listings.totalListings
                )}
                % of total
              </p>
            </div>

            {/* Col 3 - Total Value */}
            <div className="w-1/4 p-4 border border-slate-300 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-purple-400">Total Value</p>

                <LuIndianRupee className="text-purple-600" />
              </div>

              <p className="text-lg font-semibold text-purple-600">
                ₹{formatCurrencyInr(listings.totalPrice)}
              </p>
              <p className="font-medium text-xs text-slate-500">
                Combined listing value
              </p>
            </div>

            {/* Col 4 - Average Price */}
            <div className="w-1/4 p-4 border border-slate-300 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-purple-400">Average Price</p>

                <LuIndianRupee className="text-purple-600" />
              </div>

              <p className="text-lg font-semibold text-purple-600">
                ₹{formatCurrencyInr(listings.averagePrice)}
              </p>
              <p className="font-medium text-xs text-slate-500">Per listing</p>
            </div>
          </div>

          {/* Row 3 - Tabs - Overview + All Listings + Analytics */}
          <div className="flex flex-col gap-3 text-sm">
            {/* Tab Headers */}
            <div className="w-full flex bg-slate-200 p-1 rounded-full font-semibold text-sm text-center">
              {/* Tab 1 : Overview */}
              <button
                onClick={() =>
                  setTabs({
                    overview: true,
                    all_listings: false,
                    analytics: false,
                  })
                }
                className={`w-1/3 p-2 rounded-full ${
                  tabs.overview ? "bg-white" : ""
                }`}
              >
                Overview
              </button>

              {/* Tab 2 : All Listings */}
              <button
                onClick={() =>
                  setTabs({
                    overview: false,
                    all_listings: true,
                    analytics: false,
                  })
                }
                className={`w-1/3 p-2 rounded-full ${
                  tabs.all_listings ? "bg-white" : ""
                }`}
              >
                All Listings
              </button>

              {/* Tab 3 : Analytics */}
              <button
                onClick={() =>
                  setTabs({
                    overview: false,
                    all_listings: false,
                    analytics: true,
                  })
                }
                className={`w-1/3 p-2 rounded-full ${
                  tabs.analytics ? "bg-white" : ""
                }`}
              >
                Analytics
              </button>
            </div>

            {/* Tabs Content */}

            {/* Overview Tab */}
            {tabs.overview && (
              <div className="flex gap-3">
                {/* Left */}
                <div className="w-1/2 px-6 py-4 border border-slate-300 rounded-xl">
                  <p className="text-sm font-semibold">Listings by Brand</p>
                  <p className="text-xs text-slate-500 my-1">
                    Distribution of car brands
                  </p>

                  {/* Graph - Car Brands v/s Count */}
                  <BarChart data={carBrandData} />
                </div>

                {/* Right */}
                <div className="w-1/2 px-6 py-4 border border-slate-300 rounded-xl">
                  <p className="text-sm font-semibold">Listing Status</p>
                  <p className="text-xs text-slate-500 my-1">
                    Active vs Inactive Listings
                  </p>

                  {/* Graph - Car Status v/s Count */}
                  <PieChart data={statusData} />
                </div>
              </div>
            )}

            {/* All Listings Tab */}
            {tabs.all_listings && (
              <div className="px-6 py-4 border border-slate-300 rounded-xl">
                <p className="text-sm font-semibold">All Listings Management</p>
                <p className="text-xs text-slate-500 mt-1">
                  Manage all car listings on the platform
                </p>

                {/* Table */}
                <div className="mt-5">
                  {/* Table Header */}
                  <div className="w-full flex gap-3 p-2 items-center text-xs font-medium border-b-1 border-slate-300">
                    {/* Header 1 : Image */}
                    <p className="w-1/5">Image</p>

                    {/* Header 2 : Car Details */}
                    <p className="w-1/5">Car Details</p>

                    {/* Header 3 : Price */}
                    <p className="w-1/5">Price</p>

                    {/* Header 4 : Status */}
                    <p className="w-1/5">Status</p>

                    {/* Header 5 : Actions */}
                    <p className="w-1/5">Actions</p>
                  </div>

                  {/* Table Content */}
                  {renderCarList}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {tabs.analytics && (
              <div className="flex gap-3">
                {/* Left */}
                <div className="w-1/2 px-6 py-4 border border-slate-300 rounded-xl">
                  <p className="text-sm font-semibold">Listings by Condition</p>
                  <p className="text-xs text-slate-500 my-1">
                    Distribution of car conditions
                  </p>

                  {/* Graph - Car Conditions v/s Count */}
                  <BarChart data={carConditionData} />
                </div>

                {/* Right */}
                <div className="w-1/2 px-6 py-4 border border-slate-300 rounded-xl">
                  <p className="text-sm font-semibold">Platform Statistics</p>
                  <p className="text-xs text-slate-500 my-1">
                    Key metrics and insights
                  </p>

                  <div className="mt-16">
                    <div className="mt-5 flex items-center justify-between text-xs font-semibold">
                      <p className="text-slate-500">Most Popular Brand</p>
                      <p>BMW</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-xs font-semibold">
                      <p className="text-slate-500">Highest Priced Car</p>
                      <p>₹3,400,000</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-xs font-semibold">
                      <p className="text-slate-500">Lowest Priced Car</p>
                      <p>₹3,00,000</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-xs font-semibold">
                      <p className="text-slate-500">Average Mileage</p>
                      <p>26,300 miles</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal - Delete Car Modal */}
      <Modal
        centered
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Car"
        className="[&_h2]:!font-medium"
      >
        {/* Modal content */}
        <div className="flex flex-col gap-3">
          <p className="text-red-700 text-sm text-center">
            Are You Sure, you want to Delete this Car ?
          </p>

          {/* Buttons - Cancel + Delete btn */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setDeleteModal(false)}
              fullWidth
              variant="light"
              color="black"
              radius="md"
            >
              Cancel
            </Button>

            <Button
              onClick={handleDeleteCar}
              fullWidth
              variant="filled"
              color="red.9"
              radius="md"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Loader */}
      <LoadingOverlay
        visible={loader}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "violet", type: "bars" }}
      />
    </>
  );
};
