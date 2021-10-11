import React from "react";

const MovieListHeading = (props) => {
  if (props.heading === "FlixFind") {
    return (
      <div className="col">
        <a className="brand-link" href="/">
          <h1>{props.heading}</h1>
        </a>
      </div>
    );
  } else {
    return (
      <div className="col">
        <h1>{props.heading}</h1>
      </div>
    );
  }
};

export default MovieListHeading;
