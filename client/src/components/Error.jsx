import React from "react";
import { useQueryClient } from "@tanstack/react-query";

const Error = ({ info, retry }) => {
  const QueryClient = useQueryClient();

  return (
    <>
      <div className="bg-red-500 text-white rounded-md my-20 p-5 flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">{info.response.status}</h1>
        <h2>Oops! Something went wrong. Please try again later.</h2>
        <h2 className="font-semibold">{info.message}</h2>
      </div>

      <div className="flex justify-center">
        <button
          onClick={retry}
          className="border shadow px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Try Again
        </button>
      </div>
    </>
  );
};

export default Error;
