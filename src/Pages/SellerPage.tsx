import {
  Button,
  Modal,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Header } from "../Components/Header";
import { IoCalendarClearOutline, IoSpeedometerOutline } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";

export const SellerPage = () => {
  // Matine Modal Hook : Add/Edit Car
  const [opened, { open, close }] = useDisclosure(false);

  // State : to manage isEdit
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
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
              setIsEdit(false);
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
          <p className="font-semibold">Your Listings (0)</p>
          <p className="text-sm font-medium text-slate-600">
            Manage your car listings and track their performance
          </p>
        </div>

        {/* Row 3 - Cars List */}
        <div className="flex flex-col gap-5">
          {/* Card 1 */}
          <div className="w-1/3 flex flex-col gap-5 border border-slate-300 rounded-xl">
            {/* Carousel - Car Images */}
            <Carousel
              withIndicators
              slideGap="sm"
              // Carousel Loop
              emblaOptions={{
                loop: true,
                dragFree: false,
                align: "center",
              }}
              //  below is the Advanced Tailwind CSS used : "&_button" -> targets button inside Carousel
              className="[&_button]:!border-none [&_button]:!bg-violet-300"
            >
              <Carousel.Slide>
                <img
                  src="/bmw_img.jpeg"
                  alt="car img"
                  className="w-full h-48 rounded-t-xl"
                />
              </Carousel.Slide>

              <Carousel.Slide>
                <img
                  src="/bmw_img.jpeg"
                  alt="car img"
                  className="w-full h-48 rounded-t-xl"
                />
              </Carousel.Slide>

              <Carousel.Slide>
                <img
                  src="/bmw_img.jpeg"
                  alt="car img"
                  className="w-full h-48 rounded-t-xl"
                />
              </Carousel.Slide>
              {/* ...other slides */}
            </Carousel>

            {/* Car Details */}
            <div className="flex flex-col p-4 gap-3 text-slate-500 text-md">
              <p className="font-semibold text-black">2018 Toyota Camry</p>
              <p className="text-md text-slate-400">
                $ <span className="font-semibold text-black">$18,500</span>
              </p>

              <p className="flex items-center gap-1 text-sm">
                <IoSpeedometerOutline /> <span>45,000 miles</span>
              </p>

              <p className="flex items-center gap-1 text-sm">
                <IoCalendarClearOutline /> <span>2018</span>
              </p>

              <p className="w-fit px-2 py-1 text-xs text-violet-400 border border-violet-400 rounded-full">
                Excellent
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
                    setIsEdit(true);
                    open();
                  }}
                >
                  Edit
                </Button>

                <Button
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
        </div>
      </div>

      {/* Mantine Modal - Add/Edit Car Form */}
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={isEdit ? "Edit Car" : "Add New Car"}
        className="[&_h2]:!font-bold [&_h2]:!text-lg "
      >
        {/* Modal content */}
        <div className="flex flex-col gap-3">
          <p className="text-xs">
            {isEdit
              ? "Update the details of your car listing"
              : "Fill in the details of your car listing"}
          </p>

          {/* Row 1 - Name Input */}
          <TextInput
            withAsterisk
            name="name"
            label="Name"
            placeholder="Enter Name"
            radius="md"
          />

          {/* Row 2 - Model Input */}
          <TextInput
            withAsterisk
            name="model"
            label="Model"
            placeholder="Enter Model"
            radius="md"
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
            />

            {/* Price Input */}
            <NumberInput
              withAsterisk
              name="price"
              label="Price ($)"
              placeholder="Enter Price"
              radius="md"
              className="w-1/3"
              defaultValue="0"
              clampBehavior="strict"
              min={0}
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
            />
          </div>

          {/* Row 4 - Condition + Location */}
          <div className=" flex items-center gap-3">
            {/* Condition Select Option */}
            <Select
              label="Condition"
              placeholder="Select"
              data={["Excellent", "Very Good", "Good", "Fair"]}
              defaultValue="Good"
            />

            {/* Location Input */}
            <TextInput
              withAsterisk
              name="location"
              label="Location"
              placeholder="City, State"
              radius="md"
              className="w-1/2"
            />
          </div>

          {/* Row 5 - Description */}
          <Textarea
            label="Description"
            withAsterisk
            placeholder="Describe your car's features, condition, and any additional details..."
          />

          {/* Row 6 - Buttons (Cancel + Update) */}
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
              <Button fullWidth variant="filled" color="yellow" radius="md">
                Update Car
              </Button>
            ) : (
              <Button fullWidth variant="filled" color="green" radius="md">
                Add Car
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
