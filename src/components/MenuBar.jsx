import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../utils/auth";

export default function MenuBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token && checkTokenValidity(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Diagnosis/Report", path: "/DiagnosisPage" },
    { name: "About Us", path: "/AboutUsPage" },
    ...(isAuthenticated
      ? [{ name: "Logout", path: "/logout", action: handleLogout }]
      : [{ name: "Sign Up / Sign In", path: "/signin" }]),
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-auto">
      <nav className="bg-gradient-to-r from-blue-200 via-teal-400 to-green-500">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:justify-between">
              <div className="flex shrink-0 items-center">
              <img
  onClick={() => navigate("/")}
  className="h-11 w-auto cursor-pointer"
  src={process.env.PUBLIC_URL + "/fullLogo.png"}
  alt="Logo"
/>

              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item.path}
                    onClick={() => (item.action ? item.action() : navigate(item.path))}
                    className={`cursor-pointer px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? "bg-gray-200 text-black"
                        : "text-white hover:bg-gray-200 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
