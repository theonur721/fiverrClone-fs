import React from "react";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <>
      <Link className="transition hover:text-green-500" to="/login">
        Login
      </Link>
      <Link
        className="transition border rounded border-green-500 p-1 hover:bg-green-500 hover:text-white"
        to="/register"
      >
        Sign Up
      </Link>
    </>
  );
};

export default Links;
