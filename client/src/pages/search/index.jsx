import React from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Card from "./Card";

const Search = () => {
  //urlden parametre al
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  // apiye göderilcek parametreler
  const params = {
    category,
    search: query,
  };

  //api'dan hizmetleri al

  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs", params],
    queryFn: () => api.get("/gigs", { params }).then((res) => res.data.gigs),
  });

  return (
    <div>
      <h1>
        {query
          ? `results for ${query}`
          : category && `results for ${category}category `}
      </h1>

      <div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error info={error} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 my-5">
            {data && data.map((item) => <Card key={item._id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
