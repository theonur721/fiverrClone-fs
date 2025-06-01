import React from "react";
import Input from "../../components/Input";
import { inputs } from "../../utils/constants";
import Select from "./Select";
import api from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddGig = () => {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: (body) =>
      api.post(`/gigs`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: (data) => {
      console.log("Gig created successfully ✅:", data);
      navigate(`/detail/${data.data.gig._id}`);
    },
    onError: (error) => {
      toast.error("Error creating gig:", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // api'ye post isteği at
    mutate(formData); // burada gigData değil formData göndermen gerekiyor çünkü multipart/form-data ile dosya gönderiyorsun
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
          <button
            // disabled={isPending}
            className="bg-green-500 px-6 py-2 rounded-md text-white hover:bg-green-600 max-md:w-full w-1/2"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGig;
