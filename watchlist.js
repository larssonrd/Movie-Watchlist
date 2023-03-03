import { renderMovie } from "./render.js";
import { addPagination } from "./app.js";

export const watchlistArr = localStorage.getItem("movies")
  ? JSON.parse(localStorage.getItem("movies"))
  : [];

export const renderWatchlist = renderWatchlistClosure();

export function addHandler(result) {
  const moviesListArr = document.querySelectorAll(".movie");
  moviesListArr.forEach((movie) => {
    movie.addEventListener("click", (e) => {
      if (
        e.target === movie.querySelector(".movie__watchlist-btn") ||
        movie.querySelector(".movie__watchlist-btn-icon")
      ) {
        handleWatchlistClick(movie.dataset.id, result, movie);
      }
    });
  });
}

function handleWatchlistClick(id, result, movieEl) {
  const inWatchlist = watchlistArr.find((movie) => movie.imdbID === id);

  if (inWatchlist) {
    removeMovieWatchlist(id);
    movieEl.querySelector(
      ".movie__watchlist-btn"
    ).innerHTML = `<img class="movie__watchlist-btn-icon" src="img/plus.svg" />Watchlist`;
  }

  if (!inWatchlist) {
    addMovieWatchlist(id, result);
    movieEl.querySelector(
      ".movie__watchlist-btn"
    ).innerHTML = `<img class="movie__watchlist-btn-icon" src="img/minus.svg" />Remove`;
  }
}

function addMovieWatchlist(id, result) {
  const movie = result.find((movie) => movie.imdbID === id);
  if (movie) {
    watchlistArr.push(movie);
    localStorage.setItem("movies", JSON.stringify(watchlistArr));
  }
}

function removeMovieWatchlist(id) {
  const movieIndex = watchlistArr.findIndex((movie) => movie.imdbID === id);
  watchlistArr.splice(movieIndex, 1);
  localStorage.setItem("movies", JSON.stringify(watchlistArr));
  if (document.URL.includes("watchlist")) renderWatchlist();
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.URL.includes("watchlist")) {
    if (watchlistArr.length) renderWatchlist();
  }
});

function renderWatchlistClosure() {
  let currentPage = 1;

  return function (pageChange) {
    if (pageChange === "-") currentPage--;
    if (pageChange === "+") currentPage++;
    const totalPages = Math.ceil(watchlistArr.length / 10);
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    const watchListArrNew = watchlistArr.slice(start, end);

    renderMovie(watchListArrNew);
    addPagination(totalPages, currentPage);
  };
}
