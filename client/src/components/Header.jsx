import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between gap-4 md:gap-8">
        <Link to="/">
          <img className="w-[100px]" src="/fiverr.png" alt="fiverrLogo" />
        </Link>

        <form action=""></form>

        <div></div>
      </div>
    </header>
  );
};

export default Header;
