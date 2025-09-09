import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { SignUpPage } from "./Pages/SignUpPage";
import { BuyerPage } from "./Pages/BuyerPage";
import { SellerPage } from "./Pages/SellerPage";
import { AdminPage } from "./Pages/AdminPage";
import { LoginPage } from "./Pages/LoginPage";
import { Notifications } from "@mantine/notifications";

export const App = () => {
  return (
    <MantineProvider>
      <Notifications position="top-center" zIndex={100} />
      <div className="font-['poppins']">
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/buyer" element={<BuyerPage />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </MantineProvider>
  );
};
