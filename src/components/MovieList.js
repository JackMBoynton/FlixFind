import React from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  const MovieHeading = props.heading;

  if (props.movies) {
    return (
      <>
        {props.movies.map((movie, index) => (
          <div
            key={movie.imdbID}
            className="image-container d-flex justify-content-start m-3"
          >
            <div className="overlay-top d-flex align-items-center justify-content-center">
              <MovieHeading movieID={movie.imdbID} movieTitle={movie.Title} />
            </div>
            <img src={movie.Poster} alt="Movie" />
            <div
              onClick={() => props.handleFavouritesClick(movie)}
              className="overlay-bottom d-flex align-items-center justify-content-center"
            >
              <FavouriteComponent />
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default MovieList;
