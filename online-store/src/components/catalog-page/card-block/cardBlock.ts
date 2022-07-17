import { View } from '../../../interfaces/interfaces';
import './cardBlock.sass';
import cardData from './cardsData';
import Card from './card/card';

class CardBlock implements View {
    private card: Card;

    constructor() {
        this.card = new Card();
    }

    render() {
        const cardWrapper = document.querySelector('.card-block__cards-wrapper') as HTMLDivElement;

        cardData.forEach((item) => {
            cardWrapper.appendChild(this.card.render(item));
        });
    }
}

export default CardBlock;
