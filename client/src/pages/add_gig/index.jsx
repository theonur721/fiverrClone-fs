import React from "react";
import Input from "../../components/Input";
import { inputs } from "../../utils/constants";
import Select from "./Select";
import api from "../../utils/api";
import { useMutation } from "@tanstack/react-query";

const AddGig = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: (body) =>
      api.post(`/gigs`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    //inputlardaki verilere eriş
    const formData = new FormData(e.target);
    const gigData = Object.fromEntries(formData.entries());

    // Fotoğraflar inputundaki bğtğn fotoları al
    gigData.images = e.target.images.files;

    // apiye post isteği at
    mutate(gigData);
  };

  return (
    <div>
      <h1 className="mb-5 text-3xl font-bold">Create New Gig</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {inputs.map((props, key) => (
            <Input key={key} {...props} />
          ))}

          <Select />
        </div>

        <div className="flex md:justify-center my-5">
          <button className="bg-green-500 px-6 py-2 rounded-md text-white hover:bg-green-600 max-md:w-full w-1/2">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGig;
