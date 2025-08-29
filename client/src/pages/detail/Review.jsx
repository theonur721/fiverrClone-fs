import React, { useContext } from "react";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { toast } from "react-toastify";

const Review = ({ item, refetch }) => {
  const { user } = useContext(AuthContext);
  const isOwn = item?.user?._id && user?._id && item.user._id === user._id;
  const starsCount = Math.round(Number(item?.star) || 0);
  const arr = new Array(starsCount).fill(0);

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: () => api.delete(`/review/${item._id}`),
    onSuccess: () => {
      toast.warning("Review deleted successfully");
      refetch?.();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete review");
    },
  });

  return (
    <div className="flex flex-col gap-5 py-10 border-b relative">
      {isOwn && (
        <button
          onClick={() => mutate()}
          disabled={isDeleting}
          className="absolute top-12 right-1 bg-red-500 p-2 text-white rounded-md"
          title="Delete review"
        >
          <FaTrashAlt />
        </button>
      )}

      <div className="flex gap-5 items-center">
        <img
          src={item?.user?.photo || "/default-avatar.png"}
          alt={`${item?.user?.username || "User"}'s avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold">{item?.user?.username || "User"}</h4>
          <p>{item?.user?.country || "-"}</p>
        </div>
      </div>

      <div className="flex items-center">
        {arr.map((_, key) => (
          <FaStar key={key} className="text-yellow-400" />
        ))}
        <span className="font-semibold ms-1 me-3">({item?.star ?? 0})</span>
        <span className="text-gray-500 text-sm">
          {item?.createdAt ? moment(item.createdAt).fromNow() : ""}
        </span>
      </div>

      <p>{item?.desc}</p>

      <div className="flex items-center gap-5">
        <span className="text-gray-500">Was it helpful?</span>
        <button className="text-gray-500 flex gap-1 items-center">
          <AiOutlineLike />
          Yes
        </button>
        <button className="text-gray-500 flex gap-1 items-center">
          <AiOutlineDislike />
          No
        </button>
      </div>
    </div>
  );
};

export default Review;
