import React from "react";

const Input = ({
  label,
  isReq = false,
  name,
  type = "text",
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="mb-5">
      <label className="mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input
        placeholder={placeholder}
        name={name}
        type={type}
        required={isReq}
        disabled={disabled}
        className="bg-gray-50 border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-dark disabled:bg-gray-200 focus:blue-green-500"
      />
    </div>
  );
};

export default Input;
