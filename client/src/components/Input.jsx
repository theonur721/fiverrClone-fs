import React from "react";

const Input = ({
  label,
  isReq = false,
  name,
  type = "text",
  placeholder,
  disabled = false,
  isMulti,
  min,
  max,
}) => {
  return (
    <div className="mb-5">
      <label className="mb-2 text-sm font-medium text-gray-900">{label}</label>

      {type === "textarea" ? (
        <textarea
          required={isReq}
          name={name}
          className=" min-h-[100px] max-h-[250px] bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 text-dark focus:border-blue-500"
        />
      ) : (
        <input
          placeholder={placeholder}
          name={name}
          type={type}
          required={isReq}
          disabled={disabled}
          multiple={isMulti}
          min={min}
          max={max}
          className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-dark disabled:bg-gray-200 focus:blue-green-500"
        />
      )}
    </div>
  );
};

export default Input;
