import { Button, LoadingOverlay, Modal, Text, TextInput } from "@mantine/core";
import { Header } from "../Components/Header";
import {
  IoCalendarClearOutline,
  IoSearch,
  IoSpeedometerOutline,
} from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { useDisclosure } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import { errorNotification } from "../Utils/NotificationService";
import { getAllActiveCarAPI } from "../Services/CarService";
import {
  formatCurrencyInr,
  formatDate,
  formatTextToCapitalize,
} from "../Utils/Utilities";

export type CarDetailsType = {
  id: string;
  name: string;
  model: string;
  description: string;
  price: number;
  first_purchase_year: number;
  createdAt: string;
  mileage: number;
  location: string;
  condition: string;
  status: string;
  userId: string;
};

type CarsWithImages = CarDetailsType & {
  images: string[];
};

export const BuyerPage = () => {
  // Matine Modal Hook : Car Details
  const [opened, { open, close }] = useDisclosure(false);

  // State : to manage loader
  const [loader, setLoader] = useState<boolean>(false);

  // State : to store CarList
  const [activeCarList, setActiveCarList] = useState<CarsWithImages[]>([]);

  // State : to manage Single Car's Detail
  const [carDetails, setCarDetails] = useState<CarsWithImages>({
    id: "",
    name: "",
    model: "",
    description: "",
    price: 0,
    first_purchase_year: 0,
    createdAt: "",
    mileage: 0,
    location: "",
    condition: "",
    status: "",
    userId: "",
    images: [],
  });

  // State : to manage search filter
  const [search, setSearch] = useState<string>("");

  // console.log("carDetails : ", carDetails);

  const filterOnChange = (e: any) => {
    let value = e.target.value;
    setSearch(value);

    // Debouncer
    const debounceTimer = setTimeout(() => {
      getAllActiveCarsFunc(search.trim());
    }, 500); // wait 500ms before API call

    return () => clearTimeout(debounceTimer); // cleanup on new keystroke
  };

  const getAllActiveCarsFunc = async (search: string) => {
    try {
      // Fetch All Active Cars API call
      const response = await getAllActiveCarAPI(search);

      // console.log(response);

      // Store response
      setActiveCarList(response);

      // Hide Loader
      setLoader(false);
    } catch (error: any) {
      // Hide Loader
      setLoader(false);

      // Error Notification
      errorNotification("Error", "Failed to Fetch All Cars");
    }
  };

  const renderCarList = activeCarList.map((item: any, index: number) => {
    return (
      <div
        key={index}
        className="flex flex-col gap-5 border border-slate-300 rounded-xl"
      >
        {/* Car Image + Tag */}
        <div className="relative">
          {/* If No car image present, then show dummy image , else show Carousel*/}
          {item?.images.length == 0 ? (
            <img
              src="/dummy_img.jpg"
              alt="car img"
              className="w-full h-48 rounded-t-xl"
            />
          ) : (
            //  {/* Carousel - Images */}
            <Carousel
              withIndicators
              slideGap="sm"
              // Carousel Loop
              emblaOptions={{
                loop: true,
                dragFree: false,
                align: "center",
              }}
              // below is the Advanced Tailwind CSS used : "&_button" -> targets button inside Carousel
              className="[&_button]:!border-none [&_button]:!bg-violet-300"
            >
              {item?.images.map((car_image: string, index: number) => (
                <Carousel.Slide key={index}>
                  <img
                    src={`data:image/jpeg;base64,${car_image}`}
                    alt="car img"
                    className="w-full h-48 rounded-t-xl"
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          )}

          {/* Tag */}
          <div className="absolute top-3 left-3 bg-slate-800 text-white px-3 py-1 rounded-lg text-xs font-semibold">
            {formatTextToCapitalize(item.condition)}
          </div>
        </div>

        {/* Car Details */}
        <div className="flex flex-col p-4 gap-3 text-slate-500 text-md">
          <p className="font-semibold text-black">{item.name}</p>
          <p className="text-md text-slate-400">
            &#8377;{" "}
            <span className="font-semibold text-black">
              {formatCurrencyInr(item.price)}
            </span>
          </p>

          <p className="flex items-center gap-1 text-sm">
            <IoSpeedometerOutline /> <span>{item.mileage} mileage</span>
          </p>

          <p className="flex items-center gap-1 text-sm">
            <IoCalendarClearOutline /> <span>{item.first_purchase_year}</span>
          </p>

          <p className="flex items-center gap-1 text-sm">
            <GrLocation /> <span>{item.location}</span>
          </p>

          <Text size="xs" lineClamp={1}>
            {item.description}
          </Text>

          <Button
            variant="light"
            color="violet"
            radius="md"
            onClick={() => {
              setCarDetails(item);
              open();
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    );
  });

  useEffect(() => {
    // Show Loader
    setLoader(true);

    // Fetch All Active Cars API call
    getAllActiveCarsFunc("");
  }, []);

  return (
    <>
      <div className="min-h-[100vh] bg-slate-100/40 flex flex-col">
        <Header />

        {/* Buyer Page Content */}
        <div className="flex flex-col px-6 md:px-18 py-10 gap-10">
          {/* Row 1 - Title */}
          <div className="flex flex-col gap-2">
            <p className="text-[14px] md:text-3xl font-semibold">
              Find Your Perfect Car
            </p>
            <p className="text-[12px] md:text-sm font-medium text-slate-500">
              Browse through our selection of quality used cars
            </p>
          </div>

          {/* Row 2 - Search & Filter */}
          <div className="flex flex-col px-3 md:px-6 py-3 gap-5 border border-slate-300 rounded-lg">
            <p className="text-[13px] md:text-lg font-semibold">
              Search & Filter
            </p>

            {/* Filters */}
            <div className="flex items-center gap-3 md:gap-10">
              {/* Search Bar */}
              <TextInput
                variant="default"
                leftSection={<IoSearch />}
                name="search"
                placeholder="Search Cars..."
                radius="lg"
                className="w-3/5 md:w-1/3"
                value={search}
                onChange={filterOnChange}
              />

              {/* Button - to Clear Filter */}
              <Button
                onClick={() => {
                  // Reset Search variable
                  setSearch("");

                  // Fetch All Active Cars API call
                  getAllActiveCarsFunc("");
                }}
                variant="filled"
                color="violet"
                radius="lg"
                className="[&_span]:!text-[11px] md:[&_span]:!text-[14px]"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Row 3 - Cars List */}
          <div className="flex flex-col gap-5">
            <p className="font-medium text-slate-600">
              Cars Found : {activeCarList.length}
            </p>

            {/* Cars List */}
            {activeCarList.length === 0 ? (
              <p className="text-red-600 font-medium text-center capitalize">
                car is not present
              </p>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderCarList}
              </div>
            )}
          </div>
        </div>

        {/* Mantine Modal - View Car Details */}
        <Modal centered opened={opened} onClose={close} title="Car Details">
          {/* Modal content */}
          <div className="flex flex-col gap-3">
            {/* Title */}
            <div>
              <p className="font-semibold text-md">{carDetails?.name}</p>
              <p className="text-xs">
                Posted on {formatDate(carDetails?.createdAt)}
              </p>
            </div>

            {/* If No car image present, then show dummy image , else show Carousel*/}
            {carDetails?.images.length == 0 ? (
              <img
                src="/dummy_img.jpg"
                alt="car img"
                className="w-full h-48 rounded-t-xl"
              />
            ) : (
              //  {/* Carousel - Images */}
              <Carousel
                withIndicators
                slideGap="sm"
                // Carousel Loop
                emblaOptions={{
                  loop: true,
                  dragFree: false,
                  align: "center",
                }}
                // below is the Advanced Tailwind CSS used : "&_button" -> targets button inside Carousel
                className="[&_button]:!border-none [&_button]:!bg-violet-300"
              >
                {carDetails?.images.map((car_image: string, index: number) => (
                  <Carousel.Slide key={index}>
                    <img
                      src={`data:image/jpeg;base64,${car_image}`}
                      alt="car img"
                      className="w-full h-48 rounded-t-xl"
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            )}

            {/* More Details */}
            <div className="flex items-start gap-8 text-slate-600">
              {/* left - Vehicle Details */}
              <div className="w-1/2 flex flex-col gap-2 text-[10px] md:text-xs font-medium">
                <p className="text-black font-semibold">Vehicle Details</p>

                <div className="flex items-center justify-between">
                  <p>Model:</p>
                  <p className="text-black">{carDetails.model}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Year:</p>
                  <p className="text-black">{carDetails.first_purchase_year}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Mileage:</p>
                  <p className="text-black">{carDetails.mileage} miles</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Condition:</p>
                  <p className="text-black border border-slate-300 rounded-full px-2 py-1">
                    {formatTextToCapitalize(carDetails.condition)}
                  </p>
                </div>
              </div>

              {/* right - Pricing & Location */}
              <div className="w-1/2 flex flex-col gap-2 text-[10px] md:text-xs font-medium">
                <p className="text-black font-semibold">Pricing & Location</p>

                <div className="flex items-center justify-between">
                  <p>Price:</p>
                  <p className="font-semibold text-black">
                    ₹{formatCurrencyInr(carDetails.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Location:</p>
                  <p className="text-black">{carDetails.location}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1 text-[10px] md:text-xs">
              <p className="font-semibold uppercase">Description</p>
              <Text size="xs" lineClamp={2}>
                {carDetails.description}
              </Text>
            </div>

            {/* Button - Buy */}
            <Button variant="filled" color="green" radius="md">
              Proceed to Buy
            </Button>
          </div>
        </Modal>
      </div>

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
