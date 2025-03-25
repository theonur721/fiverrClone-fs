import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import User from "./Header/User";
import Links from "./Header/Links";
import { AuthContext } from "../context/authContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  // kullanıcı varsa headerdeki linkleri göster, yoksa login e yönlendir

  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between gap-4 md:gap-8">
        <Link to="/">
          <img className="w-[100px]" src="/fiverr.png" alt="fiverrLogo" />
        </Link>

        <form className="flex-1 flex border rounded overflow-hidden max-w-[600px]">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full h-full px-3 outline-none"
          />
          <button className="bg-black p-2 text-white text-xl max-md:hidden">
            <IoSearch />
          </button>
        </form>

        <div className="flex items-center gap-2 relative group">
          {user ? <User data={user} /> : <Links />}
        </div>
      </div>
    </header>
  );
};

export default Header;
