import { CardBlockView, Filters } from '../../../interfaces/interfaces';
import './cardBlock.sass';
import cardData from './cardsData';
import Card from './card/card';

class CardBlock implements CardBlockView {
    private card: Card;

    constructor() {
        this.card = new Card();
    }

    render(filterOptions: Filters) {
        const cardWrapper = document.querySelector('.card-block__cards-wrapper') as HTMLDivElement;
        cardWrapper.innerHTML = `
            <p class="sorry-message">Sorry, no products matched your search!</p>
        `;
        const sorryMessage = document.querySelector('.sorry-message') as HTMLParagraphElement;

        const filteredData = cardData.filter((item) => {
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
                (filterOptions.type.includes(type) || filterOptions.type.length === 0) &&
                (filterOptions.brand.includes(brand) || filterOptions.brand.length === 0) &&
                (filterOptions.color.includes(item.color) || filterOptions.color.length === 0) &&
                (filterOptions.movement === movement || filterOptions.movement === 'all-movements') &&
                (item.isPopular !== filterOptions.popularOnly || !filterOptions.popularOnly) &&
                item.price >= filterOptions.price[0] &&
                item.price <= filterOptions.price[1] &&
                item.amount >= filterOptions.amount[0] &&
                item.amount <= filterOptions.amount[1]
            );
        });

        if (filteredData.length) {
            filteredData.forEach((item) => {
                cardWrapper.appendChild(this.card.render(item));
            });
        } else {
            sorryMessage.classList.add('sorry-message_active');
        }
    }
}

export default CardBlock;
