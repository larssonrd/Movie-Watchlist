import { moviesContainer } from './app.js';
import { watchlistArr, addHandler } from './watchlist.js';

export function renderSpinner() {
  const markup = `<div class="init-container">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>`;
  moviesContainer.innerHTML = markup;
}

export function renderMovie(result) {
  moviesContainer.innerHTML = ``;

  // To add back movie icon if array is empty
  if (result.length === 0) {
    const markup = `
        <div class="init-container">
          <img class="movie-icon" src="img/movie-icon.svg" alt="" />
        </div>`;
    moviesContainer.insertAdjacentHTML('afterbegin', markup);
  }

  result.forEach((movie) => {
    let {
      Title: title,
      Poster: imgUrl,
      imdbRating: rating,
      Runtime: length,
      Genre: genre,
      Plot: description,
      imdbID: id,
    } = movie;

    const inWatchlist = watchlistArr.find((movie) => movie.imdbID === id);

    if (imgUrl === 'N/A') {
      imgUrl = './img/no-image.svg';
    }

    const markup = `<div class="movie" data-id="${id}">
        <img class="movie__image" src="${imgUrl}" alt="" />
        <div class="movie__info">
          <h2 class="movie__title">
            ${title}
            <span class="rating"
              ><img src="./img/star-icon.svg" alt="" srcset="" /> ${rating}</span
            >
          </h2>
          <div class="movie__details">
            <p class="movie__length">${length}</p>
            <p class="movie__genre">${genre}</p>
            <button class="movie__watchlist-btn">
            ${
              inWatchlist
                ? '<img class="movie__watchlist-btn-icon" src="img/minus.svg" />Remove'
                : '<img class="movie__watchlist-btn-icon" src="img/plus.svg" />Watchlist'
            }
              
            </button>
          </div>
          <div class="movie__description">
            ${description}
            <a class="movie__imdb-link" target="_blank" href="https://www.imdb.com/title/${id}">Read more on imdb</a>
          </div>
        </div>
      </div>`;

    moviesContainer.insertAdjacentHTML('beforeend', markup);
  });

  addHandler(result);
}
