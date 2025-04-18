import React from "react";
import { Logout, AccountCircle } from "@mui/icons-material";
import AccountMenu from "./Account";

const Header = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full h-[70px] flex items-center justify-between px-6 z-50">
      {/* Logo or Title */}
      {/* <h1 className="text-xl font-bold ml-14 text-gray-800">Dashboard</h1> */}
      <img className="h-14 rounded-xl" src="/Screenshot 2025-02-01 113753.png" alt="" />

      <AccountMenu handeLogOut={handleLogout} />
    </header>
  );
};

export default Header;
