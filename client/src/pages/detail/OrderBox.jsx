import React from "react";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { GiRecycle } from "react-icons/gi";
import { IoMdCheckmark } from "react-icons/io";

const OrderBox = ({ data }) => {
  return (
    <div className="flex flex-col gap-8 border shadow p-5 rounded">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">{data.shortTitle}</h2>
        <p className="text-lg">$ {data.price}</p>
      </div>

      <h2>{data.shortDesc}</h2>

      <div className="flex justify-between gap-5">
        <p className="font-semibold flex items-center gap-2 whitespace-nowrap">
          <FaRegClock />
          {data.deliveryTime} Days Delivery
        </p>
        <p className="font-semibold flex items-center gap-2 whitespace-nowrap">
          <GiRecycle />
          {data.revisionNumber} Revisions
        </p>
      </div>
      <ul>
        {data.features.map((i, key) => (
          <li className="flex items-center gap-2" key={i}>
            <IoMdCheckmark className="text-black" />
            <span className="text-gray-400">{i}</span>
          </li>
        ))}
      </ul>
      <button className="bg-black flex text-white p-2 rounded hover:bg-zinc-700 transition items-center">
        <span className="flex-1 font-semibold">Continue</span>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default OrderBox;
