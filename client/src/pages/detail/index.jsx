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
    queryKey: "gig",
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
          <div>
            <Info data={data} />
            <UserInfo user={data.user} />
          </div>

          <OrderBox data={data} />
        </div>
      )}
    </div>
  );
};

export default Detail;
