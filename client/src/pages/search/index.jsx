import React from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const Search = () => {
  const [params] = useSearchParams();
  const query = params.get("query");
  const category = params.get("category");

  //api'dan hizmetleri al

  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => api.get("/gigs").then((res) => res.data.gigs),
  });

  console.log(isLoading, data, error);

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
          data && data.map(() => <div>KART</div>)
        )}
      </div>
    </div>
  );
};

export default Search;
