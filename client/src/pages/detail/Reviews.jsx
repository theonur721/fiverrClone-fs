import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Review from "./Review";
import { toast } from "react-toastify";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  // Bütün yorumları çekmek için
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["reviews", gigId], // gigId'yi de ekle, böylece gigId değişince refetch olur
    queryFn: () => api.get(`/review/${gigId}`).then((res) => res.data.reviews),
  });

  // Yeni yorum eklemek için
  const { isLoading: isSubmitting, mutate } = useMutation({
    mutationFn: (newReview) => api.post("/review", newReview),
    onSuccess: () => {
      toast.success("Review added successfully");
      queryClient.invalidateQueries(["reviews", gigId]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add review");
    },
  });

  const handlesubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const star = formData.get("rating");
    const desc = formData.get("description");

    if (!star) {
      toast.error("Please select a star rating");
      return;
    }

    const newComment = {
      star: Number(star),
      desc,
      gigId,
    };
    mutate(newComment);
    e.target.reset(); // formu temizle
  };

  return (
    <div>
      <h1 className="font-semibold text-lg">Description</h1>
      <p className="font-semibold text-gray-500">
        {data
          ? `${data.length} comments have been posted for this service`
          : "Loading comments..."}
      </p>

      <p>
        average: <span className="font-semibold">{avgRating}</span>
      </p>

      <div className="mt-4">
        <form onSubmit={handlesubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-base font-medium mb-1">
                Rate your experience
              </h2>
              <div className="rating flex gap-1">
                <input value="5" name="rating" id="star5" type="radio" />
                <label htmlFor="star5">⭐</label>
                <input value="4" name="rating" id="star4" type="radio" />
                <label htmlFor="star4">⭐</label>
                <input value="3" name="rating" id="star3" type="radio" />
                <label htmlFor="star3">⭐</label>
                <input value="2" name="rating" id="star2" type="radio" />
                <label htmlFor="star2">⭐</label>
                <input value="1" name="rating" id="star1" type="radio" />
                <label htmlFor="star1">⭐</label>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="mb-1">
                Would you like to write a description?
              </label>
              <input
                id="description"
                name="description"
                className="border p-2 rounded-md shadow"
                type="text"
                placeholder="Description..."
              />
            </div>

            <button
              disabled={isSubmitting}
              className="bg-green-500 text-white p-2 rounded-md shadow hover:bg-green-600 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error.message} refetch={refetch} />
      ) : (
        data.map((item) => (
          <Review key={item._id} item={item} refetch={refetch} />
        ))
      )}
    </div>
  );
};

export default Reviews;
