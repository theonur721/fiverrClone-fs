import React from "react";
import { categories } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const navigate = useNavigate();
  const handleClick = (i) => {
    navigate(`/search?category=${i.name}`);
  };
  return (
    <div className="mt-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-5">
      {categories.map((i, key) => (
        <div
          onClick={() => handleClick(i)}
          key={key}
          className="relative border shadow p-4 rounded-md cursor-pointer group overflow-hidden"
        >
          {/* Daha büyük ve ortaya yakın yeşil leke */}
          <div className="absolute top-2 left-2 w-12 h-12 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 blur-md"></div>

          <div className="flex flex-col gap-3 items-center text-center">
            <span className="text-3xl">{i.icon}</span>
            <span className="font-semibold text-sm">{i.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
