import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { SignUpPage } from "./Pages/SignUpPage";
import { BuyerPage } from "./Pages/BuyerPage";
import { SellerPage } from "./Pages/SellerPage";
import { AdminPage } from "./Pages/AdminPage";
import { LoginPage } from "./Pages/LoginPage";

export const App = () => {
  return (
    <MantineProvider>
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
