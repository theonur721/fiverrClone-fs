import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Info from "./info";
import UserInfo from "./UserInfo";
import OrderBox from "./OrderBox";

const Detail = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => api.get(`/gigs/${id}`).then((res) => res.data.gig),
  });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} retry={refetch} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sol Kısım */}
          <div className="w-full lg:w-2/3">
            <Info data={data} />
            <UserInfo user={data.user} />
          </div>

          {/* Sağ Kısım */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <OrderBox data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
