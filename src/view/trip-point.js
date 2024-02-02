import { DateFormat, UpdateType, UserAction } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { evaluateDuration, parseDate } from '../utils.js';

const createOffersElements = (offers, selectedOffers) => offers.map(({id, title, price}) => {
  if (selectedOffers.some((item) => item === id)) {
    return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
  }
  return '';
}).join('');

const addFavoriteClass = (favoriteStatus) => (favoriteStatus) ? 'event__favorite-btn--active' : '';

const createTripPointTemplate = ({point, destination, offers}) => `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${parseDate(point.dateFrom, DateFormat.DATE)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${point.type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${point.dateFrom}">${parseDate(point.dateFrom, DateFormat.TIME)}</time>
        &mdash;
        <time class="event__end-time" datetime="${point.dateTo}">${parseDate(point.dateTo, DateFormat.TIME)}</time>
      </p>
      <p class="event__duration">${evaluateDuration(point.dateFrom, point.dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffersElements(offers, point.offers)}
    </ul>
    <button class="event__favorite-btn ${addFavoriteClass(point.isFavorite)}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;


export default class TripPoint extends AbstractView {
  #content = null;
  #handleArrowButtonClick = null;
  #handleFavoriteClick = null;

  constructor({ content, onArrowButtonClick, onFavoriteClick }) {
    super();
    this.#content = content;
    this.#handleArrowButtonClick = onArrowButtonClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template() {
    return createTripPointTemplate(this.#content);
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleArrowButtonClick();
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick(UserAction.UPDATE_EVENT, UpdateType.PATCH);
  };
}
