import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <FaSpinner className="animate-spin h-40 w-40 text-blue-700" />
    </div>
  );
};

export default Loader;
