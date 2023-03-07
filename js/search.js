import { moviesContainer, getJSON } from '../main.js';
import { addPagination } from '../main.js';
import { renderSpinner, renderMovie } from './render.js';

const API_KEY = 'f807804a';

export function searchMovie() {
  let currentSearchPage = 1;
  let currentQuery = '';

  return async function (query, pageChange) {
    try {
      renderSpinner();

      // Reset if new query
      if (query !== currentQuery) {
        currentQuery = query;
        currentSearchPage = 1;
      }

      if (pageChange === '+') currentSearchPage++;
      if (pageChange === '-') currentSearchPage--;
      if (typeof pageChange === 'number') currentSearchPage = pageChange;

      const getInitialData = await getJSON(
        `https://omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${currentSearchPage}`
      );
      const initialData = getInitialData.Search;
      const totalSearchPages = Math.ceil(getInitialData.totalResults / 10);

      const detailedData = [];
      for (let movie of initialData) {
        const { imdbID } = movie;
        const getDetailedData = await getJSON(
          `https://omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
        );
        detailedData.push(getDetailedData);
      }

      renderMovie(detailedData);
      addPagination(totalSearchPages, currentSearchPage);
    } catch (err) {
      moviesContainer.innerHTML = `<div class="init-container">No movie found. Please try again.</div>`;
      console.error(err);
    }
  };
}
