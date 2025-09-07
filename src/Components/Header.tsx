import { Avatar, Button } from "@mantine/core";
import { FaCar } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

export const Header = (props: any) => {
  //   console.log(props);
  return (
    <div className="w-full h-20 flex justify-between items-center px-6 bg-slate-100">
      {/* Left - Logo */}
      <div className="flex items-center gap-3 cursor-default">
        <FaCar className="h-8 w-8 text-purple-700" />
        <p className="text-2xl font-bold text-purple-500">CarMarket</p>
      </div>

      {/* Right - User Info + Logout */}
      <div className="flex items-center gap-8">
        {/* User Info */}
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <Avatar color="violet" radius="xl" size="md">
            RV
          </Avatar>

          {/* Name + Email */}
          <div>
            <p className="font-semibold text-sm capitalize">ranjan vaidya</p>
            <p className="font-medium text-xs text-slate-500">
              ranjanvaidya@gmail.com
            </p>
          </div>
        </div>

        {/* Role */}
        <div className="bg-violet-300/30 text-violet-600 px-3 py-1 rounded-full text-xs font-semibold">
          {props.seller ? "Seller" : "Buyer"}
        </div>

        {/* Logout */}
        <Button
          leftSection={<MdOutlineLogout size={14} />}
          variant="light"
          color="red.9"
          radius="lg"
          size="xs"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
