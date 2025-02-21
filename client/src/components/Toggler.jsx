import React from "react";

const Toggler = ({ setIsSeller }) => {
  return (
    <div className="flex gap-5 mb-5 items-center">
      <p className>Activate Seller Account</p>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          onChange={(e) => setIsSeller(e.target.checked)}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-20 h-7  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95"></div>
      </label>
    </div>
  );
};

export default Toggler;
