import React from "react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    { 
      title: "Money Recovery", 
      description: "Recover lost funds with our expert solutions.",
      onClick: () => navigate("/money-recovery"),
    },
    { 
      title: "Socials", 
      description: "Protect and enhance your online presence.",
      onClick: () => navigate("/socials"),
    },
    { 
      title: "Crypto Recovery", 
      description: "Regain access to lost crypto assets securely.",
      onClick: () => navigate("/crypto-recovery"),
    },
    { 
      title: "Others", 
      description: "Explore additional security and compliance services.",
    },
  ];

  return (
    <div className="flex justify-center mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6   rounded-lg shadow-lg max-w-xl text-center">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`backdrop-blur-md p-6 border border-white rounded-lg shadow-md transition ${
              feature.onClick ? "cursor-pointer hover:bg-gray-700" : ""
            }`}
            onClick={feature.onClick} // Handles click event if defined
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-300 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
