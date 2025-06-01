import React from "react";
import { FaRegClock } from "react-icons/fa";
import { GiRecycle } from "react-icons/gi";

const OrderBox = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 border shadow p-5 rounded">
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
    </div>
  );
};

export default OrderBox;
