import React, { useEffect, useState } from "react";

const MoviePage = ({
  match: {
    params: { movieID },
  },
}) => {
  const [movieData, setMovieData] = useState([]);

  // Function for getting individual data for movies
  const getMovieData = async (imdbID) => {
    // movie = {Title: 'Toy Story', Year: '1995', imdbID: 'tt0114709', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMj…TViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg'}

    const movieURL = `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.REACT_APP_API_KEY}`;

    // send req using url and convert to JSON
    const res = await fetch(movieURL);
    const resJSON = await res.json();

    setMovieData(resJSON);
  };

  // On page load, get movie data
  useEffect(() => {
    getMovieData(movieID);
  }, [movieID]);

  return (
    <div className="container-fluid">
      <div className="row d-flex align-items-center mt-4 mb-4">
        {movieData.Title}
        <br />
        {movieData.Released}
        <br />
        {movieData.Rated}
        <br />
        {movieData.Plot}
      </div>
    </div>
  );
};

export default MoviePage;
