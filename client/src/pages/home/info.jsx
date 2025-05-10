import React from "react";
import { items } from "../../utils/constants";
import { BsFillPatchCheckFill } from "react-icons/bs";

const Info = () => {
  return (
    <div className="my-10 bg-green-100 bg-opacity-70 rounded:md p-4 sm:p-6">
      <h1 className="text-3xl">
        <span className="font-extrabold">fiverr</span>
        <span> pro.</span>
      </h1>
      <p className="text-4xl font-light my-6 sm:my-8">
        The <span className="text-green-400">preimum</span> freelance solution
        for businesses
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item, index) => (
          <div key={index}>
            <h5 className="font-semibold flex items-center gap-2">
              <BsFillPatchCheckFill className="text-lg" />
              {item.title}
            </h5>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-6 sm:my-8">
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800">
          Try Now
        </button>
      </div>
    </div>
  );
};

export default Info;
