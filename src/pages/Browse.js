import React, { useState, useEffect } from "react";
import Card from "../components/Card";

import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  useCheckCurrentUser,
  useAppContext,
  useSubmitFormContentCheck,
} from "../contexts/AppContext";

let jsonData = require("./../imdb.json");

export default function Browse() {
  const filmsPerPage = 20;
  const [state, dispatch] = useAppContext();
  const [isAuthorized] = useCheckCurrentUser();
  const [formIsNotEmpty] = useSubmitFormContentCheck();
  const [pages, setPages] = useState(0);
  const [films, setFilms] = useState([]);

  const [popUp, setPopUp] = useState({
    show: false,
    writer: "",
    plot: "",
    actors: "",
    imdbrating: "",
  });

  function logout(e) {
    e.preventDefault();
    dispatch({ type: "loginUser", payload: { email: "", password: "" } });
  }

  function closePopUp(e) {
    e.preventDefault();
    setPopUp((prev) => {
      return { ...prev, show: false };
    });
  }

  function onUpdate() {
    setTimeout(() => {
      setPages((prev) => prev + 1);
    }, 1000);
  }

  useEffect(() => {
    const newChunk = jsonData.slice(
      pages * filmsPerPage,
      pages * filmsPerPage + 20
    );
    setFilms((prev) => [...prev, ...newChunk]);
  }, [pages]);

  return (
    <div className="browse-container">
      <nav className="menu">
        <ul className="menu-list">
          <li className="menu-list-item">
            <Link to="/#" className="list-item-link">
              Home
            </Link>
          </li>

          {!isAuthorized ? (
            <>
              <li className="menu-list-item">
                <Link to="/signin" className="signin-signup-btn">
                  Sign In
                </Link>
              </li>
              <li className="menu-list-item">
                <Link to="/signup" className="signin-signup-btn">
                  {formIsNotEmpty && "Resume"} Sign Up
                </Link>
              </li>{" "}
            </>
          ) : (
            <>
              <li className="menu-list-item">
                <p>Welcome, {`${state.currentUser.name}`}</p>
              </li>
              <li className="menu-list-item">
                <a href="/" onClick={logout} className="signin-signup-btn">
                  Exit
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <InfiniteScroll
        className="cards-container"
        dataLength={pages * filmsPerPage}
        next={onUpdate}
        hasMore={pages * filmsPerPage < jsonData.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {popUp.show && (
          <div className="overlay">
            <div className="popup">
              <p>
                <span>Plot: </span>
                {popUp.plot}
              </p>
              <p>
                <span>Writer: </span>
                {popUp.writer}
              </p>
              <p>
                <span>Actors: </span>
                {popUp.actors}
              </p>
              <p>
                <span>Imdb: </span>
                {popUp.imdbrating}
              </p>
              <Link to="" onClick={closePopUp}>
                Close
              </Link>
            </div>
          </div>
        )}

        {films.map((film) => {
          return <Card key={film.id} film={film} setPopUp={setPopUp} />;
        })}
      </InfiniteScroll>
    </div>
  );
}
