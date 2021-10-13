import React from "react";
import { Link } from "react-router-dom";

const MovieHeading = ({ movieID, movieTitle }) => {
  return (
    <>
      <Link to={`/movies/${movieID}`}>{movieTitle}</Link>
    </>
  );
};

export default MovieHeading;
