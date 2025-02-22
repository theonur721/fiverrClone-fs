import React from "react";
import { Link } from "react-router-dom";

const User = ({ data }) => {
  return (
    <>
      <img
        src="https://picsum.photos/200"
        className="w-[40px] h-[40px] object-cover rounded-full"
      />
      <span>{data.username}</span>

      <div className="text-center mt-2 w-[150px] text-[13px] flex-col absolute top-[40px] left-0 transition bg-gray-200 rounded-md hidden group-hover:flex">
        {data.isSeller && (
          <>
            <Link to="/my-gig" className="px-5 py-2 hover:bg-gray-100">
              Services
            </Link>
            <Link to="/add-gig" className="px-5 py-2 hover:bg-gray-100">
              Add Service
            </Link>
          </>
        )}
        <Link className="px-5 py-2 hover:bg-gray-100">Orders</Link>
        <Link className="px-5 py-2 hover:bg-gray-100">Messages</Link>
        <button className="px-5 py-2 hover:bg-gray-100">Exit</button>
      </div>
    </>
  );
};

export default User;
