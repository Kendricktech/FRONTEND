import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, FileText, Folder, MessageCircle, Settings, Menu, X } from "lucide-react"; // Importing icons from Lucide

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate();

  // Sidebar navigation items
  const sidebarItems = [
    { label: "Dashboard Overview", path: "/", icon: <Home className="w-6 h-6" /> },
    { label: "Submit New Case", path: "/start-recovery", icon: <FileText className="w-6 h-6" /> },
    { label: "My Case History", path: "/my-cases", icon: <Folder className="w-6 h-6" /> },
    { label: "Messages/Support", path: "/support", icon: <MessageCircle className="w-6 h-6" /> },
    { label: "Settings", path: "/settings", icon: <Settings className="w-6 h-6" /> },
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-4 absolute top-4 left-4 z-50"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block w-64 h-screen bg-black/50 text-white shadow-lg p-4 fixed inset-0 lg:static lg:w-64`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="mb-4">
              <button
                onClick={() => navigate(item.path)}
                className="flex items-center space-x-4 px-4 py-2 w-full text-left hover:bg-blue-600 rounded-lg transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
