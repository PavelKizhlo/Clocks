import { View, Filters } from '../../interfaces/interfaces';
import Filter from './filter/filter';
import Search from './search/search';
import Sort from './sort/sort';
import Controller from './controller/controller';
import CardBlock from './card-block/cardBlock';
import './catalog.sass';

class CatalogPage implements View {
    private filter: Filter;
    private search: Search;
    private sort: Sort;
    private cardBlock: CardBlock;
    private controller: Controller;

    constructor() {
        this.filter = new Filter();
        this.search = new Search();
        this.sort = new Sort();
        this.cardBlock = new CardBlock();
        this.controller = new Controller();
    }

    render() {
        const activeLink = document.querySelector('.nav__link_active');
        const catalogLink = document.querySelector('.nav__link_catalog') as HTMLButtonElement;
        if (activeLink) {
            activeLink.classList.remove('nav__link_active');
        }

        catalogLink.classList.add('nav__link_active');
        const container = document.getElementById('container') as HTMLBodyElement;

        container.innerHTML = `
          <div class="catalog-page">
            <div class="catalog-page__content">
              <div class="catalog-page__info">
                <h1 class="catalog-page__title">Catalog</h1>
                <p class="catalog-page__text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam aspernatur veritatis sapiente excepturi repudiandae doloribus placeat necessitatibus aliquam! Neque ullam voluptatibus quisquam officia quis corrupti laudantium! Error, nobis impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ipsam perspiciatis. Possimus quod veritatis perspiciatis. Nulla labore fugiat commodi possimus fugit officia beatae dolorum ab, fuga at assumenda obcaecati mollitia.
                </p>
              </div>
              <img class="catalog-page__image" src="./assets/catalog/catalog-info.jpg" alt="two clocks">
            </div>
          </div>
          <div class="catalog-page__products products">
            <div class="products__filter-block filter-block">
              <div class="filter-block__search search"></div>
              <div class="filter-block__filters filters"></div>
            </div>
            <div class="products__card-block card-block">
              <div class="card-block__sort sort"></div>
              <div class="card-block__cards-wrapper"></div>
            </div>
          </div>
        `;

        this.search.render();
        this.filter.render();
        this.sort.render();

        const filterDataJSON = localStorage.getItem('filterData');
        if (filterDataJSON) {
            this.cardBlock.render(JSON.parse(filterDataJSON) as Filters);
        } else {
            this.cardBlock.render({
                type: [],
                brand: [],
                color: [],
                movement: 'all-movements',
                price: [0, 300],
                amount: [0, 100],
                popularOnly: false,
            });
        }

        this.controller.start();

        localStorage.setItem('page', 'catalog');
    }
}

export default CatalogPage;
