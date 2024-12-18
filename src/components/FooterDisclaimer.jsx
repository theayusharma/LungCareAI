import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, ClipboardListIcon, InformationCircleIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline";

function FooterDisclaimer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white text-center text-sm py-3">
        <p>
          Disclaimer: This application is not a substitute for professional medical advice.
        </p>
      </footer>
    </div>
  );
}

export default function BottomNavigationBar({ isAuthenticated, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const navItems = [
    { name: "Home", path: "/", Icon: HomeIcon },
    { name: "Diagnosis", path: "/DiagnosisPage", Icon: ClipboardListIcon },
    { name: "About Us", path: "/AboutUsPage", Icon: InformationCircleIcon },
    ...(isAuthenticated
      ? [{ name: "Logout", path: "/logout", Icon: LogoutIcon, action: handleLogout }]
      : [{ name: "Sign In", path: "/signin", Icon: UserIcon }]),
  ];

  return (
    <div>
      <div className="fixed bg-gradient-to-r from-blue-200 via-teal-400 to-green-500 bottom-0 left-0 right-0 shadow-md z-10 sm:hidden">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => (item.action ? item.action() : navigate(item.path))}
              className={`flex flex-col items-center ${
                location.pathname === item.path ? "text-black" : "text-white"
              } transition-colors duration-300`}
            >
              <item.Icon className="h-6 w-6" />
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-20 sm:mb-0">
        <FooterDisclaimer />
      </div>
    </div>
  );
}
