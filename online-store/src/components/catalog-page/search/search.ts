import { View } from '../../../interfaces/interfaces';
import './search.sass';

class Search implements View {
    render() {
        const searchContainer = document.querySelector('.search') as HTMLDivElement;

        searchContainer.innerHTML = `
          <h2 class="search__title">Search</h2>
          <div class="search__wrapper"><input type="text" name="search" id="search" autocomplete="off" autofocus placeholder="Search here"></div>
        `;

        (document.getElementById('search') as HTMLInputElement).focus();
    }
}

export default Search;
