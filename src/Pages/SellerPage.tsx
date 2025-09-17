import {
  Button,
  FileInput,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Header } from "../Components/Header";
import { IoCalendarClearOutline, IoSpeedometerOutline } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  errorNotification,
  successNotification,
} from "../Utils/NotificationService";
import {
  addCarAPI,
  deleteCarAPI,
  getAllCarsOfUserAPI,
  updateCarAPI,
  uploadCarImagesAPI,
} from "../Services/CarService";
import type { CarDetailsType } from "./BuyerPage";
import { getLocalStorageItem } from "../Utils/LocalStorage";
import {
  formatCurrencyInr,
  formatTextToCapitalize,
  formatTextToUppercase,
} from "../Utils/Utilities";
import { Carousel } from "@mantine/carousel";

export const SellerPage = () => {
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
    condition: "",
    status: "ACTIVE",
    userId: "",
  };

  // Matine Modal Hook : Add/Edit Car
  const [opened, { open, close }] = useDisclosure(false);

  // Mantine Modal Hook : Delete Car
  const [deleteCarModal, setDeleteCarModal] = useState<boolean>(false);

  // Mantine Modal : Images
  const [imagesModal, setImagesModal] = useState<boolean>(false);

  // State : to manage isEdit
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const userDetails = getLocalStorageItem("user");

  // State : to manage loader
  const [loader, setLoader] = useState<boolean>(false);

  // State : to manage Car Lists
  const [carList, setCarList] = useState([]);

  // State : to manage car details
  const [carDetails, setCarDetails] = useState<CarDetailsType>(formData);

  // State : to manage car form error
  const [formError, setFormError] = useState<CarDetailsType>(formData);

  // State : to Store Array of Images url
  const [imagesArray, setImagesArray] = useState<string[]>([]);

  // console.log("carList : ", carList);

  const renderCarList = carList.map((item: any, index: number) => {
    return (
      <div
        key={index}
        className="flex flex-col gap-5 border border-slate-300 rounded-xl"
      >
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
            {item?.images.map((car_image: string) => (
              <Carousel.Slide>
                <img
                  src={`data:image/jpeg;base64,${car_image}`}
                  alt="car img"
                  className="w-full h-48 rounded-t-xl"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}

        {/* Car Details */}
        <div className="flex flex-col p-4 gap-3 text-slate-500 text-md">
          <p className="font-semibold text-black">
            {item.first_purchase_year} {item.name}
          </p>
          <p className="text-md text-slate-400">
            ₹{" "}
            <span className="font-semibold text-black">
              ₹{formatCurrencyInr(item.price)}
            </span>
          </p>

          <p className="flex items-center gap-1 text-sm">
            <IoSpeedometerOutline /> <span>{item.mileage} mileage</span>
          </p>

          <p className="flex items-center gap-1 text-sm">
            <IoCalendarClearOutline /> <span>{item.first_purchase_year}</span>
          </p>

          <p className="w-fit px-2 py-1 text-xs text-violet-400 border border-violet-400 rounded-full">
            {formatTextToCapitalize(item.condition)}
          </p>

          {/* Buttons - Edit + Delete */}
          <div className="flex gap-3">
            <Button
              fullWidth
              variant="filled"
              color="yellow"
              radius="md"
              leftSection={<FaRegEdit />}
              onClick={() => {
                // exclude images from item
                const { images, ...rest } = item;
                setCarDetails(rest); // store everything except for images

                setFormError(formData);
                setIsEdit(true);
                open();
              }}
            >
              Edit
            </Button>

            <Button
              onClick={() => {
                // Store current car item in variable
                setCarDetails(item);

                // Open Car Delete Modal
                setDeleteCarModal(true);
              }}
              fullWidth
              variant="filled"
              color="red.9"
              radius="md"
              leftSection={<MdOutlineDeleteOutline />}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  });

  const getAllCarsOfUser = async () => {
    // Show Loader
    setLoader(true);

    try {
      const response = await getAllCarsOfUserAPI(userDetails?.id);
      // console.log("Response : ", response);

      setCarList(response);

      // Hide Loader
      setLoader(false);
    } catch (error) {
      // Hide Loader
      setLoader(false);

      errorNotification("Error", "Failed to Fetch All Cars");
    }
  };

  // Handle Car Form change
  const onChangeCarFields = (value: any, fieldName?: string) => {
    // console.log(e);

    // Case 1: Called by controlled Mantine inputs like NumberInput / Select
    if (fieldName) {
      if (fieldName === "condition") {
        value = formatTextToUppercase(value); // Format to Uppercase
      }
      setCarDetails({ ...carDetails, [fieldName]: value });
      return;
    }

    // Case 2: Normal inputs (TextInput, etc.)
    const { name, value: inputValue } = value.target;
    setCarDetails({ ...carDetails, [name]: inputValue });
  };

  // Submit Car Form
  const submitCarForm = async (e: any) => {
    e.preventDefault();

    // Reset Form errors
    setFormError(formData);

    let valid = true;

    // Check Required fields validation
    if (carDetails.name === "") {
      setFormError({ ...formError, name: "This field is required" });
      valid = false;
    }
    if (carDetails.model === "") {
      setFormError({ ...formError, model: "This field is required" });
      valid = false;
    }
    if (carDetails.location === "") {
      setFormError({ ...formError, location: "This field is required" });
      valid = false;
    }
    if (carDetails.description === "") {
      setFormError({ ...formError, description: "This field is required" });
      valid = false;
    }

    // Validation Failed, Please fill all required fields
    if (valid === false) return;

    // Show Loader
    setLoader(true);

    try {
      if (isEdit) {
        // Update Car API
        await updateCarAPI(carDetails);
      } else {
        // Add Car API
        await addCarAPI(userDetails.id, carDetails);
      }

      // Reset all variables
      setCarDetails(formData);
      setFormError(formData);

      // Close Add/Edit Car Modal
      close();

      // Call - Get All Cars API
      getAllCarsOfUser();

      // Hide Loader
      setLoader(false);

      // Success Notification
      successNotification(
        "Success",
        isEdit ? "Car updated successfully" : "Car added successfully"
      );
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
      setDeleteCarModal(false);

      // Fetch All car list
      getAllCarsOfUser();

      // Hide Loader
      setLoader(false);

      // Show Success Modal
      successNotification("Success", response?.message);
    } catch (error) {
      // Hide Loader
      setLoader(false);
    }
  };

  // Function to Convert Multiple Images to Base64
  const getBase64Multiple = (files: File[]): Promise<string[]> => {
    return Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
          })
      )
    );
  };

  // Handle : Images Change
  const handleImagesChange = async (images: any) => {
    // console.log("images : ", images);

    // Convert Multiple Images to Base64
    let base64Images: any = await getBase64Multiple(images);

    // Split Base64 w.r.t comma ","
    base64Images = base64Images.map((item: string) => item.split(",")[1]);
    // console.log("Base64 Images:", base64Images);

    setImagesArray(base64Images);
  };

  // Handle : Save Car Images
  const handleCarImages = async () => {
    // Validation - Check whether Car images are uploaded or not
    if (imagesArray.length < 1) {
      errorNotification("Failed", "Please upload images first");
      return;
    }

    // Create request body
    let request_body = { carId: carDetails?.id, images: imagesArray };

    // Show Loader
    setLoader(true);

    try {
      // API Call - Upload Images
      await uploadCarImagesAPI(request_body);

      // Reset - Images Modal, Images Array
      setImagesModal(false);
      setImagesArray([]);

      // Show Success Message
      successNotification("Success", "Uploaded Car Images");

      // Hide Loader
      setLoader(false);
    } catch (error) {
      // Hide Loader
      setLoader(false);
    }
  };

  // Page Load Workflow
  useEffect(() => {
    getAllCarsOfUser();
  }, []);

  return (
    <>
      <div className="min-h-[100vh] bg-slate-100/40 flex flex-col">
        <Header />

        {/* Seller Page Content */}
        <div className="flex flex-col px-18 py-10 gap-10">
          {/* Row 1 - Title + Add Car btn */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-semibold">Seller Dashboard</p>
              <p className="text-sm font-medium text-slate-500">
                Manage your car listings
              </p>
            </div>

            {/* Button - Add new car */}
            <Button
              onClick={() => {
                // Reset all variables
                setCarDetails(formData);
                setFormError(formData);
                setIsEdit(false);

                // Open Add Car Modal
                open();
              }}
              leftSection="+"
              variant="filled"
              color="green"
              radius="md"
            >
              Add New Car
            </Button>
          </div>

          {/* Row 2 - Info */}
          <div className="flex flex-col px-6 py-3 gap-1 border border-slate-300 rounded-lg">
            <p className="font-semibold">Your Listings ({carList?.length})</p>
            <p className="text-sm font-medium text-slate-600">
              Manage your car listings and track their performance
            </p>
          </div>

          {/* Row 3 - Cars List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderCarList}
          </div>
        </div>

        {/* Mantine Modal - Add/Edit Car Form - Conditional (If Images Modal is Opened then don't show this Modal) */}
        {!imagesModal && (
          <Modal
            centered
            opened={opened}
            onClose={close}
            title={isEdit ? "Edit Car" : "Add New Car"}
            className="[&_h2]:!font-bold [&_h2]:!text-lg "
          >
            {/* Modal content */}
            <div className="flex flex-col gap-2">
              {/* Button - Upload Images */}
              {isEdit && (
                <div className="flex place-content-end">
                  <Button
                    variant="filled"
                    color="violet"
                    radius="md"
                    className="sm:w-1/2 md:w-1/3"
                    onClick={() => {
                      setImagesModal(true);
                      setImagesArray([]);
                    }}
                  >
                    Upload Images
                  </Button>
                </div>
              )}

              {/* Row 1 - Name Input */}
              <TextInput
                withAsterisk
                name="name"
                label="Name"
                placeholder="Enter Name"
                radius="md"
                value={carDetails.name}
                onChange={onChangeCarFields}
                error={formError.name}
              />

              {/* Row 2 - Model Input */}
              <TextInput
                withAsterisk
                name="model"
                label="Model"
                placeholder="Enter Model"
                radius="md"
                value={carDetails.model}
                onChange={onChangeCarFields}
                error={formError.model}
              />

              {/* Row 3 - Year + Price + Mileage */}
              <div className=" flex items-center gap-3">
                {/* Year Input */}
                <NumberInput
                  withAsterisk
                  name="year"
                  label="Year"
                  placeholder="Enter Year"
                  radius="md"
                  className="w-1/3"
                  defaultValue="2025"
                  clampBehavior="strict"
                  min={0}
                  max={2100}
                  value={carDetails.first_purchase_year}
                  onChange={(val) =>
                    onChangeCarFields(val, "first_purchase_year")
                  }
                />

                {/* Price Input */}
                <NumberInput
                  withAsterisk
                  name="price"
                  label="Price (₹)"
                  placeholder="Enter Price"
                  radius="md"
                  className="w-1/3"
                  defaultValue="0"
                  clampBehavior="strict"
                  min={0}
                  value={carDetails.price}
                  onChange={(val) => onChangeCarFields(val, "price")}
                />

                {/* Mileage Input */}
                <NumberInput
                  withAsterisk
                  name="mileage"
                  label="Mileage"
                  placeholder="Enter Mileage"
                  radius="md"
                  className="w-1/3"
                  defaultValue="0"
                  clampBehavior="strict"
                  min={0}
                  value={carDetails.mileage}
                  onChange={(val) => onChangeCarFields(val, "mileage")}
                />
              </div>

              {/* Row 4 - Condition + Status */}
              <div className=" flex items-center gap-3">
                {/* Condition Select Option */}
                <Select
                  name="condition"
                  label="Condition"
                  placeholder="Select"
                  data={["Excellent", "Very Good", "Good", "Fair"]}
                  defaultValue={formatTextToCapitalize(carDetails.condition)}
                  onChange={(val) => onChangeCarFields(val, "condition")}
                />

                {/* Status Select Option */}
                <Select
                  name="status"
                  label="Status"
                  placeholder="Select"
                  data={["ACTIVE", "INACTIVE"]}
                  defaultValue={carDetails.status}
                  onChange={(val) => onChangeCarFields(val, "status")}
                />
              </div>

              {/* Row 5 - Location Input */}
              <TextInput
                withAsterisk
                name="location"
                label="Location"
                placeholder="City, State"
                radius="md"
                className="w-full"
                value={carDetails.location}
                onChange={onChangeCarFields}
                error={formError.location}
              />

              {/* Row 6 - Description */}
              <Textarea
                name="description"
                label="Description"
                withAsterisk
                placeholder="Describe your car's features, condition, and any additional details..."
                value={carDetails.description}
                onChange={onChangeCarFields}
                error={formError.description}
              />

              {/* Row 7 - Buttons (Cancel + Update) */}
              <div className="flex gap-3">
                <Button
                  onClick={close}
                  fullWidth
                  variant="light"
                  color="black"
                  radius="md"
                >
                  Cancel
                </Button>

                {isEdit ? (
                  <Button
                    onClick={submitCarForm}
                    fullWidth
                    variant="filled"
                    color="yellow"
                    radius="md"
                  >
                    Update Car
                  </Button>
                ) : (
                  <Button
                    onClick={submitCarForm}
                    fullWidth
                    variant="filled"
                    color="green"
                    radius="md"
                  >
                    Add Car
                  </Button>
                )}
              </div>
            </div>
          </Modal>
        )}

        {/* Mantine Modal - Delete Car Modal */}
        <Modal
          centered
          opened={deleteCarModal}
          onClose={() => setDeleteCarModal(false)}
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
                onClick={() => setDeleteCarModal(false)}
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

        {/* Mantine Modal - Car Images Modal */}
        <Modal
          opened={imagesModal}
          onClose={() => setImagesModal(false)}
          title="Car Images"
          centered
          className="[&_h2]:!font-semibold"
        >
          {/* Upload Images */}
          <FileInput
            label="Upload Images"
            placeholder="Upload files"
            accept="image/png,image/jpeg,image/jpg"
            multiple
            clearable
            onChange={handleImagesChange}
          />

          {/* Save Button */}
          <Button
            variant="filled"
            color="violet"
            radius="md"
            className="mt-3"
            onClick={handleCarImages}
          >
            Save Images
          </Button>
        </Modal>
      </div>

      <LoadingOverlay
        visible={loader}
        zIndex={100000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "violet", type: "bars" }}
      />
    </>
  );
};
