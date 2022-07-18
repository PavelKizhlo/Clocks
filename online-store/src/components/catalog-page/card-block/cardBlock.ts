import { CardBlockView, Filters } from '../../../interfaces/interfaces';
import './cardBlock.sass';
import cardData from './cardsData';
import Card from './card/card';

class CardBlock implements CardBlockView {
    private card: Card;

    constructor() {
        this.card = new Card();
    }

    render(filterData: Filters, searchString: string, sortData: string) {
        const cardWrapper = document.querySelector('.card-block__cards-wrapper') as HTMLDivElement;
        cardWrapper.innerHTML = `
            <p class="sorry-message">Sorry, no products matched your search!</p>
        `;
        const sorryMessage = document.querySelector('.sorry-message') as HTMLParagraphElement;

        const filteredData = cardData
            .filter((item) => {
                let type: string;

                switch (item.type) {
                    case 'Pocket watch':
                        type = item.type[0].toLowerCase() + item.type.split(' ').join('-').slice(1) + 'es';
                        break;
                    default:
                        type = item.type[0].toLowerCase() + item.type.split(' ').join('-').slice(1) + 's';
                }

                const brand = item.brand[0].toLowerCase() + item.brand.slice(1);
                const movement = item.movement.split(' ').join('-');

                return (
                    (filterData.type.includes(type) || filterData.type.length === 0) &&
                    (filterData.brand.includes(brand) || filterData.brand.length === 0) &&
                    (filterData.color.includes(item.color) || filterData.color.length === 0) &&
                    (filterData.movement === movement || filterData.movement === 'all-movements') &&
                    (item.isPopular !== filterData.popularOnly || !filterData.popularOnly) &&
                    item.price >= filterData.price[0] &&
                    item.price <= filterData.price[1] &&
                    item.amount >= filterData.amount[0] &&
                    item.amount <= filterData.amount[1]
                );
            })
            .filter((item) => {
                return searchString ? item.brand.toLowerCase().includes(searchString) : true;
            });

        switch (sortData) {
            case 'byNameA_Z':
                filteredData.sort((a, b) => {
                    if (a.brand < b.brand) {
                        return -1;
                    }
                    if (a.brand > b.brand) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 'byNameZ_A':
                filteredData.sort((a, b) => {
                    if (a.brand > b.brand) {
                        return -1;
                    }
                    if (a.brand < b.brand) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 'byPrice_high':
                filteredData.sort((a, b) => b.price - a.price);
                break;
            case 'byPrice_low':
                filteredData.sort((a, b) => a.price - b.price);
                break;
        }

        const productsFound = document.querySelector('.sort__products-found') as HTMLSpanElement;

        if (filteredData.length) {
            filteredData.forEach((item) => {
                cardWrapper.appendChild(this.card.render(item));
            });

            if (filteredData.length === 1) {
                productsFound.innerHTML = `${filteredData.length} Product found`;
            } else {
                productsFound.innerHTML = `${filteredData.length} Products found`;
            }
        } else {
            sorryMessage.classList.add('sorry-message_active');
            productsFound.innerHTML = '0 Products found';
        }
    }
}

export default CardBlock;
