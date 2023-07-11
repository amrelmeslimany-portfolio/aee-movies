import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsBody from "../components/ItemDetails/DetailsBody";

import DetailsHeader from "../components/ItemDetails/DetailsHeader";
import { getDetailsItem } from "../context/movies/movies-cruds";
import Loading from "../components/UI/Loading";

import Error from "../components/UI/Error";

function Details() {
  const [{ data, error, isFetching }, setFetch] = useState({
    data: {},
    isFetching: false,
    error: null,
  });
  const { id } = useParams();

  useEffect(() => {
    getDetailsItem(id, setFetch);
  }, [id]);

  return (
    <div className="details-page">
      {isFetching && <Loading />}

      {!isFetching && Object.keys(data).length !== 0 && (
        <>
          <DetailsHeader data={data} />
          <DetailsBody data={data} />
        </>
      )}

      {error && <Error message={error} />}
    </div>
  );
}

export default Details;
