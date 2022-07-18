import { View } from '../../../interfaces/interfaces';
import './sort.sass';

class Sort implements View {
    render() {
        const sortContainer = document.querySelector('.sort') as HTMLDivElement;

        sortContainer.innerHTML = `
          <span class="sort__products-found"></span>
          <div class="sort__wrapper">
            <span class="sort__by">Sort by</span>
            <select name="sort" id="sort">
              <option value="byNameA_Z">name from A to Z</option>
              <option value="byNameZ_A">name from Z to A</option>
              <option value="byPrice_high">price from high to low</option>
              <option value="byPrice_low">price from low to high</option>
            </select>
        `;
    }
}

export default Sort;
