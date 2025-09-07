import { IoAnalytics, IoCarSportOutline } from "react-icons/io5";
import { Header } from "../Components/Header";
import { LuDollarSign } from "react-icons/lu";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaToggleOn } from "react-icons/fa";

export const AdminPage = () => {
  // State : to manage Admin Tabs
  const [tabs, setTabs] = useState({
    overview: true,
    all_listings: false,
    analytics: false,
  });

  // console.log(tabs);

  return (
    <div className="min-h-[100vh] bg-slate-100/40 flex flex-col">
      <Header admin />

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

            <p className="text-lg font-semibold text-purple-600">4</p>
            <p className="font-medium text-xs text-slate-500">
              4 active, 0 inactive
            </p>
          </div>

          {/* Col 2 - Active Listings */}
          <div className="w-1/4 p-4 border border-slate-300 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-purple-400">Active Listings</p>

              <IoAnalytics className="text-purple-600" />
            </div>

            <p className="text-lg font-semibold text-purple-600">4</p>
            <p className="font-medium text-xs text-slate-500">100% of total</p>
          </div>

          {/* Col 3 - Total Value */}
          <div className="w-1/4 p-4 border border-slate-300 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-purple-400">Total Value</p>

              <LuDollarSign className="text-purple-600" />
            </div>

            <p className="text-lg font-semibold text-purple-600">$3,475,500</p>
            <p className="font-medium text-xs text-slate-500">
              Combined listing value
            </p>
          </div>

          {/* Col 4 - Average Price */}
          <div className="w-1/4 p-4 border border-slate-300 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-purple-400">Average Price</p>

              <LuDollarSign className="text-purple-600" />
            </div>

            <p className="text-lg font-semibold text-purple-600">$868,875</p>
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
                <p className="text-xs text-slate-500 mt-1">
                  Distribution of car brands
                </p>

                {/* Graph */}
              </div>

              {/* Right */}
              <div className="w-1/2 px-6 py-4 border border-slate-300 rounded-xl">
                <p className="text-sm font-semibold">Listing Status</p>
                <p className="text-xs text-slate-500 mt-1">
                  Active vs Inactive Listings
                </p>

                {/* Graph */}
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
                <div className="w-full flex gap-3 p-2 items-center text-xs border-b-1 border-slate-300">
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
                    <p className="font-semibold">2018 Toyota Camry</p>
                    <p className="text-slate-600 my-1">
                      2018 &bull; 45,000 miles
                    </p>
                    <p className="text-slate-600">San Francisco, CA</p>
                  </div>

                  {/* Col 3 : Price */}
                  <p className="w-1/5 font-semibold">$18,500</p>

                  {/* Col 4 : Status */}
                  <div className="w-1/5">
                    <p className="w-fit px-3 py-1 bg-emerald-700 font-medium text-white rounded-lg">
                      Active
                    </p>
                  </div>

                  {/* Col 5 : Actions - Toggle + Delete */}
                  <div className="w-1/5 flex items-center gap-3">
                    {/* Toggle */}
                    <div className="w-fit px-2 py-1 border border-slate-300 rounded-lg">
                      <FaToggleOn className="text-2xl text-emerald-700" />
                    </div>

                    {/* Delete */}
                    <div className="w-fit px-3 py-2 bg-red-700 rounded-lg">
                      <RiDeleteBin6Line className="text-lg text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {tabs.analytics && (
            <div className="flex gap-3">
              {/* Left */}
              <div className="w-1/2 px-6 py-4 border border-slate-300 rounded-xl">
                <p className="text-sm font-semibold">Listings by Condition</p>
                <p className="text-xs text-slate-500 mt-1">
                  Distribution of car conditions
                </p>

                {/* Graph */}
              </div>

              {/* Right */}
              <div className="w-1/2 px-6 py-4 border border-slate-300 rounded-xl">
                <p className="text-sm font-semibold">Platform Statistics</p>
                <p className="text-xs text-slate-500 mt-1">
                  Key metrics and insights
                </p>

                <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                  <p className="text-slate-500">Most Popular Brand</p>
                  <p>BMW</p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                  <p className="text-slate-500">Highest Priced Car</p>
                  <p>$3,400,000</p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                  <p className="text-slate-500">Lowest Priced Car</p>
                  <p>$18,500</p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                  <p className="text-slate-500">Average Mileage</p>
                  <p>26,300 miles</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
