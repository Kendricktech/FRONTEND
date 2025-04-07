import React from "react";

const Hero = () => {
  return (
    <div className="px-6 py-16 text-center  backdrop-blur-md md:text-left max-w-4xl mx-auto my-auto">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
      Recover Your Lost Money with Confidence
      </h1>
      <p className="text-lg text-white mt-4 max-w-lg mx-auto md:mx-0">
      Get expert assistance in retrieving lost funds from scams, fraud, and unauthorized transactions. Our secure, fast, and effective recovery process ensures you get the justice you deserve.
      </p>
      <form className="mt-6 flex flex-col md:flex-row justify-center md:justify-start gap-4">
        <input
          type="email"
          placeholder="Enter Your Email"
          autoComplete="email"
          aria-label="Email"
          className="px-4 py-3 w-full md:w-80 rounded-lg text-black focus:ring focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:opacity-80 transition duration-300"
          title="Track Your Recovery"
          aria-label="Track Your Recovery"
        >
          Track Your Recovery
        </button>
      </form>
    </div>
  );
};

export default Hero;
