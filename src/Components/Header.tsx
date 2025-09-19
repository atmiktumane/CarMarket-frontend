import { Avatar, Button, Menu } from "@mantine/core";
import { FaCar } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import {
  clearAllLocalStorageItems,
  getLocalStorageItem,
} from "../Utils/LocalStorage";
import { formatTextToCapitalize, getNameInitials } from "../Utils/Utilities";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  //   console.log(props);

  // Fetch User Details from Local Storage
  const userDetails = getLocalStorageItem("user");

  // console.log("userDetails : ", userDetails);

  const navigate = useNavigate();

  const logoutFunction = () => {
    clearAllLocalStorageItems();

    // Navigate to Login Page
    navigate("/login");
  };

  return (
    <div className="w-full h-15 md:h-20 flex justify-between items-center px-6 bg-slate-100">
      {/* Left - Logo */}
      <div className="flex items-center gap-3 cursor-default">
        <FaCar className="h-6 md:h-8 w-6 md:w-8 text-purple-700" />
        <p className="text-lg md:text-2xl font-bold text-purple-500">
          CarMarket
        </p>
      </div>

      {/* Right - User Info + Logout */}
      <div className="hidden md:flex items-center gap-8">
        {/* User Info */}
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <Avatar color="violet" radius="xl" size="md">
            {getNameInitials(userDetails.name)}
          </Avatar>

          {/* Name + Email */}
          <div>
            <p className="font-semibold text-sm capitalize">
              {userDetails.name}
            </p>
            <p className="font-medium text-xs text-slate-500">
              {userDetails.email}
            </p>
          </div>
        </div>

        {/* Role */}
        <div className="bg-violet-300/30 text-violet-600 px-3 py-1 rounded-full text-xs font-semibold">
          {userDetails.role}
        </div>

        {/* Logout */}
        <Button
          leftSection={<MdOutlineLogout size={14} />}
          variant="light"
          color="red.9"
          radius="lg"
          size="xs"
          onClick={logoutFunction}
        >
          Logout
        </Button>
      </div>

      {/* Profile Menu - Mobile Responsive View  */}
      <div className="flex md:hidden">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="light"
              color="violet"
              radius="lg"
              className="[&_span]:text-[12px]"
            >
              Profile
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>
              {/* Name + Email */}
              <div>
                <p className="font-semibold text-[10px] capitalize">
                  {userDetails.name}
                </p>
                <p className="font-medium text-[10px] text-slate-500">
                  {userDetails.email}
                </p>
              </div>
            </Menu.Item>

            <Menu.Item>
              {/* User Role */}
              <p className="font-medium text-[10px] text-purple-500">
                {formatTextToCapitalize(userDetails.role)} Role
              </p>
            </Menu.Item>

            <Menu.Item>
              {/* Logout */}
              <Button
                fullWidth
                leftSection={<MdOutlineLogout size={14} />}
                variant="light"
                color="red.9"
                radius=""
                // size={`[10px]`}
                className="[&_span]:!text-[12px]"
                onClick={logoutFunction}
              >
                Logout
              </Button>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};
