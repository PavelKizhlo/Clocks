import { View } from '../../../interfaces/interfaces';
import './search.sass';

class Search implements View {
    render() {
        const searchContainer = document.querySelector('.search') as HTMLDivElement;

        searchContainer.innerHTML = `
          <h2 class="search__title">Search</h2>
          <div class="search__wrapper">
            <input type="text" name="search" id="search" autocomplete="off" placeholder="Search here">
            <span class="clean-search"></span>
          </div>
        `;

        const searchField = document.getElementById('search') as HTMLInputElement;
        const searchWrapper = searchContainer.querySelector('.search__wrapper') as HTMLDivElement;
        const clearSearch = searchContainer.querySelector('.clean-search') as HTMLSpanElement;

        searchField.focus();

        searchField.addEventListener('input', () => {
            searchWrapper.classList.add('search__active');
            if (searchField.value === '') {
                searchWrapper.classList.remove('search__active');
            }
        });

        clearSearch.addEventListener('click', () => {
            searchField.value = '';
            searchField.focus();
            searchWrapper.classList.remove('search__active');
            localStorage.removeItem('searchString');
        });
    }
}

export default Search;
