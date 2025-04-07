import React from "react";

const AnimatedIcons = () => {
  return (
    <div className="flex justify-center mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[0, 1, 2].map((index) => (
          <div key={index} className={`relative animate-float ${index === 1 ? "delay-1" : index === 2 ? "delay-2" : ""}`}>
            <div className="w-24 h-24 bg-gradient-to-br from-[#22384c] to-[#2e5069] rounded-xl shadow-lg flex items-center justify-center">
              <dotlottie-player
                src="https://lottie.host/865e402a-fc9c-4f0d-84a1-e5cef1f133a9/JnvmEVsavR.lottie"
                background="transparent"
                speed="1"
                style={{ width: "80px", height: "80px" }}
                loop
                autoPlay
              ></dotlottie-player>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedIcons;
