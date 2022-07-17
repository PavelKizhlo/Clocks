import { CardView, CardData } from '../../../../interfaces/interfaces';
import './card.sass';

class Card implements CardView {
    render(cardData: CardData) {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
          <img src="./assets/catalog/cards/${cardData.src}" alt="${cardData.brand}" class="card__image">
          <div class="card__content">
            <h3 class="card__title">${cardData.brand}</h3>
            <div class="card__info">
              <div class="card__description">${cardData.type} with ${cardData.movement} movement</div>
              <div class="card__amount">Amount: ${cardData.amount}</div>
              <div class="card__icons">
                <div class="card__color ${cardData.color}"></div>
                <div class="card__popular${cardData.isPopular ? ' popular-item' : ''}"></div>
              </div>
              <strong class="card__price">€ ${cardData.price}</strong>
            </div>
          </div>
          <button class="card__button">Add to cart</button>
        `;

        return card;
    }
}

export default Card;
