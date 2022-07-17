import { Filters } from '../../../interfaces/interfaces';
import CardBlock from '../card-block/cardBlock';
import { target, API } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import Emitter from 'events';

class Controller {
    emitter: Emitter;
    filterData!: Filters;
    cardBlock: CardBlock;

    constructor() {
        this.emitter = new Emitter();
        this.cardBlock = new CardBlock();
    }

    start() {
        this.setSearchString();
        this.getSearchString();
        this.setFilterData();
        this.getFilterData();
        this.setSortData();
        this.getSortData();

        this.emitter.on('update', () => {
            this.cardBlock.render(this.filterData);
            console.log(localStorage);
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

        const clearButton = document.getElementById('clear-filters') as HTMLButtonElement;

        clearButton.addEventListener('click', () => {
            this.filterData = {
                type: [],
                brand: [],
                color: [],
                movement: 'all-movements',
                price: [0, 300],
                amount: [0, 100],
                popularOnly: false,
            };
            localStorage.setItem('filterData', JSON.stringify(this.filterData));
            this.emitter.emit('update');
        });

        // const cardBlock = new CardBlock();

        // this.emitter.on('update', () => {
        //     this.filterData = filterData;
        //     cardBlock.render(filterData);
        // });
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

        searchField.addEventListener('input', () => {
            localStorage.setItem('searchString', searchField.value);
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
            this.emitter.emit('update');
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

export default Controller;
