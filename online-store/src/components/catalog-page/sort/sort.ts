import { View } from '../../../interfaces/interfaces';
import './sort.sass';

class Sort implements View {
    render() {
        const sortContainer = document.querySelector('.sort') as HTMLDivElement;

        sortContainer.innerHTML = `
          <span class="sort__products-found">Some Products Found</span>
          <div class="sort__wrapper">
            <span class="sort__by">Sort by</span>
            <select name="sort" id="sort">
              <option value="byNameA_Z">name from A to Z</option>
              <option value="byNameZ_A">name from Z to A</option>
              <option value="byYear_new">year from new to old</option>
              <option value="byYear_old">year from old to new</option>
            </select>
        `;

        this.setSortData();
        this.getSortData();
    }

    private getSortData() {
        const sortSelect = document.getElementById('sort') as HTMLSelectElement;

        sortSelect.addEventListener('change', () => {
            localStorage.setItem('sort', sortSelect.value);
        });
    }

    private setSortData() {
        const sortData = localStorage.getItem('sort');
        const sortSelect = document.getElementById('sort') as HTMLSelectElement;

        if (sortData) {
            sortSelect.value = sortData;
        }
    }
}

export default Sort;
