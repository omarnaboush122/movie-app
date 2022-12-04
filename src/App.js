import { useState, useEffect } from "react";
import Movie from "./Movie";
import searchIcon from "./search.svg";
import { nanoid } from "nanoid";

const URL = "https://www.omdbapi.com/?i=tt3896198&apikey=628066a4";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = (title) => {
    fetch(`${URL}&s=${title}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search));
  };

  useEffect(() => {
    searchMovies("fast");
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(search)}
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <Movie movie={movie} key={nanoid()} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
