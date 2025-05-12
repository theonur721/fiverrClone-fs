import React from "react";
import { categories } from "../../utils/constants";

const Select = () => {
  return (
    <div className="mb-5">
      <label className="mb-2 text-sm font-medium text-gray-900">Category</label>
      <select
        name="category"
        required
        className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-dark disabled:bg-gray-200 focus:blue-green-500"
      >
        <option value="">Choose</option>
        {categories.map((item, key) => (
          <option key={key} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
