import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  // States
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [movieData, setMovieData] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`; // template string

    // sending a request using the above url and converting it to JSON
    const response = await fetch(url);
    const responseJSON = await response.json();

    // if we have results
    if (responseJSON.Search) {
      // then use setMovies to set our state
      setMovies(responseJSON.Search);
    }
  };

  // Function for getting individual data for movies
  const getMovieData = async (movie) => {
    // movie = {Title: 'Toy Story', Year: '1995', imdbID: 'tt0114709', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMj…TViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg'}

    const movieURL = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${process.env.REACT_APP_API_KEY}`;

    // send req using url and convert to JSON
    const res = await fetch(movieURL);
    const resJSON = await res.json();

    setMovieData(resJSON);
  };

  // any value we add to the array - when it is updated; so the method will be run
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    var movieFavourites = JSON.parse(
      localStorage.getItem("react-flixfind-favourites")
    );

    // safeguard for mobile phone usage when ...iterate cannot be null
    if (!movieFavourites) {
      movieFavourites = [];
    }

    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-flixfind-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="FlixFind" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        {/* We need to pass the favourites component in as a prop, this means we can use different components for
        different things */}
        <MovieList
          movies={movies}
          handleMovieClick={getMovieData}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        {/* We need to pass the favourites component in as a prop, this means we can use different components for
        different things */}
        <MovieList
          movies={favourites}
          handleMovieClick={getMovieData}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
