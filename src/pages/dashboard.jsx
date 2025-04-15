import React from "react";
import Sidebar from "../components/SideBar";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Your dashboard content goes here */}
        <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
        <p className="mt-4">Welcome to your dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;
