import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}` // template string

    // sending a request using the above url and converting it to JSON
    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }
  }

  // any value we add to the array - when it is updated; so the method will be run
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
      <div className='container-fluid movie-app'>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading='FlixFind'/>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        <div className='row'>
          <MovieList movies={movies} />
        </div>
      </div>
  );
}

export default App;

