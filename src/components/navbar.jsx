import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png"; // Adjust the path as necessary
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Articles", path: "/articles" },
   
    { label: "FAQ", path: "/faq" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="bg-transparent backdrop-blur-md text-white p-4 flex justify-between items-center border-black bg-black/70 border-2 shadow-md relative z-50">
      {/* Logo */}
      <div className="flex flex-row-reverse items-center justify-between ">
  <h1
    className="text-xl font-bold cursor-pointer mr-4"
    onClick={() => handleNavigate("/")}
  >
    Recovery Guard
  </h1>
  <img src={logoImage} alt="Recovery Guard" className="max-h-10 w-auto" />
</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        {navItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleNavigate(item.path)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-4 w-48 bg-gray-800 text-white shadow-lg rounded-lg md:hidden">
          <ul className="flex flex-col">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  className="w-full px-4 py-2 hover:bg-blue-600 transition text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
