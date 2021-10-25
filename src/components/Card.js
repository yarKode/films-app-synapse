import React from "react";
import { useCheckCurrentUser } from "../contexts/AppContext";

import { Icon } from "@iconify/react";

export default function Card({ film, setPopUp }) {
  const { plot, writer, actors, imdbrating } = film;

  const [isAuthorized] = useCheckCurrentUser();
  function infoClickHandler(e) {
    e.preventDefault();
    setPopUp((prev) => ({
      ...prev,
      plot,
      writer,
      actors,
      imdbrating,
      show: true,
    }));
  }
  return (
    <div className="sep-card">
      <h3>
        {`${film?.title} `}
        {film?.imdbrating < 7 && (
          <Icon icon="heroicons-solid:thumb-down" color="red" />
        )}
      </h3>
      {isAuthorized && (
        <div className="card-info">
          <p>
            <span>Genre:</span> {film?.genre}
          </p>
          <p>
            <span>Director:</span> {film?.director}
          </p>
          <p>
            <span>Year:</span> {film?.year}
          </p>
          <a href="/#" onClick={infoClickHandler}>
            <Icon icon="akar-icons:info" />
          </a>
        </div>
      )}
      <img src={film?.poster} alt="spiderman portrait" />
    </div>
  );
}

//Plot, Writer, Actors, IMDB rating.
