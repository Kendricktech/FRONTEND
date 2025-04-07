import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Recovery Guard
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        {["Home", "About", "Contact"].map((item, index) => (
          <li key={index}>
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-4 w-48 bg-gray-800 text-white shadow-lg rounded-lg md:hidden">
          <ul className="flex flex-col">
            {["Home", "About", "Contact"].map((item, index) => (
              <li key={index}>
                <button
                  className="w-full px-4 py-2 hover:bg-blue-600 transition text-left"
                >
                  {item}
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
