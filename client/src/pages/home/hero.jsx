import React from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    navigate(`/search?query=${text}`);
  };

  return (
    <div>
      <section className="md:rounded-md h-[40vh] bg-[#0a4226] text-white p-5 pt-20 m-[20px] md:px-12 md:py-10 max-md:m-[-20px] flex flex-col items-center justify-center px-6 py-5">
        <div className="max-w-[600px]">
          <h1 className="text-4xl md:text-5xl  font-light md:text-center">
            Scale your proffessional workforce with
            <span className="font-serif"> freelancers</span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-md w-full flex gap-5 mt-10"
          >
            <input
              className="flex-1 p-2 rounded-md text-black outline-none"
              type="text"
              placeholder="search for any service"
            />
            <button className="bg-[#0a4226] m-1 p-2 rounded-md hover:bg-opacity-70 transition">
              <IoSearch />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Hero;
