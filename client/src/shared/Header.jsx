import React from "react";
import { Logout, AccountCircle } from "@mui/icons-material";

const Header = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full h-[70px] flex items-center justify-between px-6 z-50">
      {/* Logo or Title */}
      <h1 className="text-xl font-bold ml-14 text-gray-800">Dashboard</h1>

      {/* Right Section - Profile & Logout */}
      <div className="flex items-center space-x-4">
        {/* Profile Icon */}
        <AccountCircle className="text-gray-600" fontSize="large" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition"
        >
          Logout
          <Logout fontSize="small" />
        </button>
      </div>
    </header>
  );
};

export default Header;
