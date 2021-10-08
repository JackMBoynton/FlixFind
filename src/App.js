import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([
    
  ]);

  const getMovieRequest = async () => {
    const url = 'http://www.omdbapi.com/?s=The Godfather&apikey=2212bf28'

    // sending a request using the above url and converting it to JSON
    const response = await fetch(url);
    const responseJSON = await response.json();

    setMovies(responseJSON.Search);

  }

  // use the function for getting a response, when an array is empty - i.e. when page loads
  useEffect(() => {
    getMovieRequest();
  }, []);

  return (
      <div className='container-fluid movie-app'>
        <div className='row'>
          <MovieList movies={movies} />
        </div>
      </div>
  );
}

export default App;

