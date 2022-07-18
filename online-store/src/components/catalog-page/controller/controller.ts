import { Filters } from '../../../interfaces/interfaces';
import Search from '../search/search';
import Filter from '../filter/filter';
import Sort from '../sort/sort';
import CardBlock from '../card-block/cardBlock';
import { target, API } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import Emitter from 'events';

class Controller {
    emitter: Emitter;
    filterData!: Filters;
    searchString!: string;
    sortData!: string;
    cardBlock: CardBlock;
    search: Search;
    filter: Filter;
    sort: Sort;
    cartContent: string[];

    constructor() {
        this.emitter = new Emitter();
        this.cardBlock = new CardBlock();
        this.search = new Search();
        this.filter = new Filter();
        this.sort = new Sort();
        this.cartContent = [];
    }

    start() {
        this.setSearchString();
        this.getSearchString();
        this.setFilterData();
        this.getFilterData();
        this.setSortData();
        this.getSortData();
        this.listenCleanButton();
        this.setCartContent();
        this.getCartContent();

        this.emitter.on('update', () => {
            this.cardBlock.render(this.filterData, this.searchString, this.sortData);
            this.setCartContent();
        });
    }

    private getFilterData() {
        const filterDataJSON = localStorage.getItem('filterData');
        this.filterData = filterDataJSON
            ? (JSON.parse(filterDataJSON) as Filters)
            : {
                  type: [],
                  brand: [],
                  color: [],
                  movement: 'all-movements',
                  price: [0, 300],
                  amount: [0, 100],
                  popularOnly: false,
              };

        const priceSlider = document.getElementById('price-slider') as HTMLDivElement;
        const amountSlider = document.getElementById('amount-slider') as HTMLDivElement;

        const filters = document.querySelector('.filters') as HTMLDivElement;

        filters.addEventListener('input', (evt) => {
            const target = evt.target as HTMLInputElement;
            if (target.type === 'radio') {
                this.filterData.movement = target.id;
            }

            if (target.name === 'popular') {
                this.filterData.popularOnly = target.checked;
            }

            if (target.name === 'type' || target.name === 'brand' || target.name === 'color') {
                target.checked
                    ? this.filterData[target.name].push(target.id)
                    : (this.filterData[target.name] = this.filterData[target.name].filter(
                          (item) => item !== target.id
                      ));
            }

            this.emitter.emit('update');

            localStorage.setItem('filterData', JSON.stringify(this.filterData));
        });

        ((priceSlider as target).noUiSlider as API).on('end', (values, handle, unencoded) => {
            this.filterData.price = unencoded;
            localStorage.setItem('filterData', JSON.stringify(this.filterData));
            this.emitter.emit('update');
        });

        ((amountSlider as target).noUiSlider as API).on('end', (values, handle, unencoded) => {
            this.filterData.amount = unencoded;
            localStorage.setItem('filterData', JSON.stringify(this.filterData));
            this.emitter.emit('update');
        });
    }

    private setFilterData() {
        const filterDataJSON = localStorage.getItem('filterData');

        if (filterDataJSON) {
            const filterData = JSON.parse(filterDataJSON) as Filters;
            const priceSlider = document.getElementById('price-slider') as HTMLDivElement;
            const amountSlider = document.getElementById('amount-slider') as HTMLDivElement;

            for (const key in filterData) {
                if (key === 'type' || key === 'brand' || key === 'color') {
                    document.querySelectorAll(`input[name="${key}"]`).forEach((input) => {
                        (input as HTMLInputElement).checked = filterData[key].includes(input.id);
                    });
                }

                if (key === 'popularOnly') {
                    (document.querySelector('input[name="popular"]') as HTMLInputElement).checked = filterData[key];
                }

                if (key === 'movement') {
                    document.querySelectorAll(`input[name="${key}"]`).forEach((input) => {
                        (input as HTMLInputElement).checked = filterData[key] === input.id;
                    });
                }

                if (key === 'price') {
                    ((priceSlider as target).noUiSlider as API).set(filterData[key]);
                }

                if (key === 'amount') {
                    ((amountSlider as target).noUiSlider as API).set(filterData[key]);
                }
            }
        }
    }

    private getSearchString() {
        const searchField = document.getElementById('search') as HTMLInputElement;
        const clearSearch = document.querySelector('.clean-search') as HTMLSpanElement;

        searchField.addEventListener('input', () => {
            localStorage.setItem('searchString', searchField.value);
            this.searchString = searchField.value;
            this.emitter.emit('update');
        });

        clearSearch.addEventListener('click', () => {
            localStorage.removeItem('searchString');
            this.searchString = '';
            this.emitter.emit('update');
        });
    }

    private setSearchString() {
        const searchString = localStorage.getItem('searchString') ? localStorage.getItem('searchString') : '';
        const searchWrapper = document.querySelector('.search__wrapper') as HTMLDivElement;
        const searchField = document.getElementById('search') as HTMLInputElement;

        searchField.value = searchString as string;
        if (searchField.value) {
            searchWrapper.classList.add('search__active');
        }
    }

    private getSortData() {
        const sortSelect = document.getElementById('sort') as HTMLSelectElement;

        sortSelect.addEventListener('change', () => {
            localStorage.setItem('sort', sortSelect.value);
            this.sortData = sortSelect.value;
            this.emitter.emit('update');
        });
    }

    private setSortData() {
        const sortData = localStorage.getItem('sort');
        const sortSelect = document.getElementById('sort') as HTMLSelectElement;

        if (sortData) {
            sortSelect.value = sortData;
            this.sortData = sortData;
        }
    }

    private listenCleanButton() {
        const clearButton = document.getElementById('clear-filters') as HTMLButtonElement;

        clearButton.addEventListener('click', () => {
            this.searchString = '';
            localStorage.setItem('searchString', this.searchString);

            this.filterData = this.filterData = {
                type: [],
                brand: [],
                color: [],
                movement: 'all-movements',
                price: [0, 300],
                amount: [0, 100],
                popularOnly: false,
            };
            localStorage.setItem('filterData', JSON.stringify(this.filterData));

            this.search.render();
            this.setSearchString();
            this.getSearchString();

            this.filter.render();
            this.setFilterData();
            this.getFilterData();

            this.emitter.emit('update');
        });
    }

    private getCartContent() {
        const cardWrapper = document.querySelector('.card-block__cards-wrapper') as HTMLDivElement;

        cardWrapper.addEventListener('click', (evt) => {
            const target = evt.target as HTMLElement;
            const cartNumber = document.querySelector('.cart-number') as HTMLSpanElement;

            if (target.classList.contains('card__button')) {
                const card = target.parentElement as HTMLDivElement;

                if (card.classList.contains('in-cart')) {
                    card.classList.remove('in-cart');
                    target.innerHTML = 'Add to cart';
                    this.cartContent = this.cartContent.filter((item) => item !== card.id);
                    localStorage.setItem('cartContent', this.cartContent.toString());

                    if (this.cartContent.length) {
                        cartNumber.innerHTML = `${this.cartContent.length}`;
                    } else {
                        cartNumber.classList.remove('cart-number_active');
                    }
                } else {
                    if (this.cartContent.length < 5) {
                        card.classList.add('in-cart');
                        target.innerHTML = 'Remove from cart';
                        this.cartContent.push(card.id);
                        localStorage.setItem('cartContent', this.cartContent.toString());
                        cartNumber.classList.add('cart-number_active');
                        cartNumber.innerHTML = `${this.cartContent.length}`;
                    } else {
                        target.innerHTML = 'Too much !!!';
                        card.classList.add('in-cart');
                        setTimeout(() => {
                            target.innerHTML = 'Add to cart';
                            card.classList.remove('in-cart');
                        }, 500);
                    }
                }
            }
        });
    }

    private setCartContent() {
        const cartContent = localStorage.getItem('cartContent') ? localStorage.getItem('cartContent') : '';
        this.cartContent = cartContent ? cartContent.split(',') : [];

        document.querySelectorAll('.card').forEach((card) => {
            const cartNumber = document.querySelector('.cart-number') as HTMLSpanElement;
            const button = card.querySelector('.card__button') as HTMLButtonElement;

            if (this.cartContent.includes(card.id)) {
                card.classList.add('in-cart');
                button.innerHTML = 'Remove from cart';
                cartNumber.classList.add('cart-number_active');
                cartNumber.innerHTML = `${this.cartContent.length}`;
            }
        });
    }
}

export default Controller;
