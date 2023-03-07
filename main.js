import { searchMovie } from './js/search.js';
import { renderWatchlist } from './js/watchlist.js';

export const moviesContainer = document.querySelector('.movies-container');
const searchInput = document.getElementById('search-form__input');
const searchBtn = document.getElementById('search-form__btn');
const search = searchMovie();

export async function getJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Problem getting data. Please try again');
    const data = await res.json();
    if (data.Response === 'False') throw new Error(data.Error);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

if (!document.URL.includes('watchlist')) {
  searchBtn.addEventListener('click', handleSearchBtnClick);
}

function handleSearchBtnClick(e) {
  e.preventDefault();
  search(searchInput.value, 1);
}

export function addPagination(totalPages, currentPage) {
  if (totalPages > 1) {
    const markup = `
    <div class="pagination">
      <a class="pagination__btn" id="prev-page">Previous page</a>
      <p>${currentPage}/${totalPages}</p>
      <a class="pagination__btn" id="next-page">Next page</a>
    </div>`;

    moviesContainer.insertAdjacentHTML('beforeend', markup);

    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    if (currentPage === 1) {
      prevPageBtn.style.visibility = 'hidden';
    }

    if (currentPage === totalPages) {
      nextPageBtn.style.visibility = 'hidden';
    }

    prevPageBtn.addEventListener('click', function () {
      if (currentPage > 1) {
        document.URL.includes('watchlist')
          ? renderWatchlist('-')
          : search(searchInput.value, '-');
      }
    });
    nextPageBtn.addEventListener('click', function () {
      if (currentPage <= totalPages) {
        document.URL.includes('watchlist')
          ? renderWatchlist('+')
          : search(searchInput.value, '+');
      }
    });
  }
}
