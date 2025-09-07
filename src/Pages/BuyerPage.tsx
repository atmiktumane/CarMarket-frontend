import {
  Button,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { Header } from "../Components/Header";
import {
  IoCalendarClearOutline,
  IoSearch,
  IoSpeedometerOutline,
} from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { useDisclosure } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";

export const BuyerPage = () => {
  // Matine Modal Hook : Car Details
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="min-h-[100vh] bg-slate-100/40 flex flex-col">
      <Header />

      {/* Buyer Page Content */}
      <div className="flex flex-col px-18 py-10 gap-10">
        {/* Row 1 - Title */}
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-semibold">Find Your Perfect Car</p>
          <p className="text-sm font-medium text-slate-500">
            Browse through our selection of quality used cars
          </p>
        </div>

        {/* Row 2 - Search & Filter */}
        <div className="flex flex-col px-6 py-3 gap-5 border border-slate-300 rounded-lg">
          <p className="font-semibold">Search & Filter</p>

          {/* Filters */}
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <TextInput
              variant="default"
              leftSection={<IoSearch />}
              placeholder="Search Cars..."
              radius="lg"
            />

            {/* Brands Filter */}
            <Select
              variant="default"
              placeholder="Select Model"
              data={["All Models", "BMW", "Honda", "Toyota"]}
              defaultValue="All Models"
              radius="lg"
            />

            {/* Price Filter */}
            <NumberInput
              variant="default"
              placeholder="Max Price ($)"
              radius="lg"
            />

            {/* Button - to Clear Filter */}
            <Button variant="filled" color="violet" radius="lg">
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Row 3 - Cars List */}
        <div className="flex flex-col gap-5">
          <p className="font-medium text-slate-600">3 cars found</p>

          {/* Card 1 */}
          <div className="w-1/3 flex flex-col gap-5 border border-slate-300 rounded-xl">
            {/* Car Image + Tag */}
            <div className="relative">
              {/* Carousel - Images */}
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

              {/* Tag */}
              <div className="absolute top-3 left-3 bg-slate-800 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                Excellent
              </div>
            </div>

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

              <p className="flex items-center gap-1 text-sm">
                <GrLocation /> <span>Los Angeles, CA</span>
              </p>

              <Text size="xs" lineClamp={2}>
                Well-maintained Toyota Camry with full service history. Single
                owner, garage kept.
              </Text>

              <Button variant="light" color="violet" radius="md" onClick={open}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mantine Modal - View Car Details */}
      <Modal centered opened={opened} onClose={close} title="Car Details">
        {/* Modal content */}
        <div className="flex flex-col gap-3">
          {/* Title */}
          <div>
            <p className="font-semibold text-md">2018 Toyota Camry</p>
            <p className="text-xs">Posted on 15 Jan 2024</p>
          </div>

          {/* Carousel - Images */}
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
                className="w-full h-48 rounded-xl"
              />
            </Carousel.Slide>

            <Carousel.Slide>
              <img
                src="/bmw_img.jpeg"
                alt="car img"
                className="w-full h-48 rounded-xl"
              />
            </Carousel.Slide>

            <Carousel.Slide>
              <img
                src="/bmw_img.jpeg"
                alt="car img"
                className="w-full h-48 rounded-xl"
              />
            </Carousel.Slide>
            {/* ...other slides */}
          </Carousel>

          {/* More Details */}
          <div className="flex items-start gap-8 text-slate-600">
            {/* left - Vehicle Details */}
            <div className="w-1/2 flex flex-col gap-2 text-xs font-medium">
              <p className="text-black font-semibold">Vehicle Details</p>

              <div className="flex items-center justify-between">
                <p>Brand:</p>
                <p className="text-black">Toyota</p>
              </div>

              <div className="flex items-center justify-between">
                <p>Model:</p>
                <p className="text-black">Camry</p>
              </div>

              <div className="flex items-center justify-between">
                <p>Year:</p>
                <p className="text-black">2018</p>
              </div>

              <div className="flex items-center justify-between">
                <p>Mileage:</p>
                <p className="text-black">45,000 miles</p>
              </div>

              <div className="flex items-center justify-between">
                <p>Condition:</p>
                <p className="text-black border border-slate-300 rounded-full px-2 py-1">
                  Excellent
                </p>
              </div>
            </div>

            {/* right - Pricing & Location */}
            <div className="w-1/2 flex flex-col gap-2 text-xs font-medium">
              <p className="text-black font-semibold">Pricing & Location</p>

              <div className="flex items-center justify-between">
                <p>Price:</p>
                <p className="font-semibold text-black">$18,500</p>
              </div>

              <div className="flex items-center justify-between">
                <p>Location:</p>
                <p className="text-black">Los Angeles, CA</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 text-xs">
            <p className="font-semibold uppercase">Description</p>
            <Text size="xs" lineClamp={2}>
              Well-maintained Toyota Camry with full service history. Single
              owner, garage kept.
            </Text>
          </div>

          {/* Button - Buy */}
          <Button variant="light" color="green" radius="md">
            Proceed to Buy
          </Button>
        </div>
      </Modal>
    </div>
  );
};
