import React from "react";

const Button = ({ text, className }) => {
  return (
    <button
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
