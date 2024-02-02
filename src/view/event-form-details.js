import { BLANK_POINT } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createOffersList = (selectedOffers, offers) => offers.map((offer) => {
  const isChecked = (selectedOffers.some((id) => id === offer.id)) ? 'checked' : '';
  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" data-offer-id="${offer.id}" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
}).join('');

const renderOffers = (selectedOffers, offers) => {
  if (offers.length === 0) {
    return '';
  }
  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

  <div class="event__available-offers">
    ${createOffersList(selectedOffers, offers)}
  </div>
</section>`;
};

const renderPictures = (pictures) => {
  if (pictures.length === 0) {
    return '';
  }
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
  </div>
</div>`;
};


const renderDestination = (destination) => {
  if (!destination || (!destination.description && destination.pictures.length === 0)) {
    return '';
  }
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destination.description}</p>
  ${renderPictures(destination.pictures)}
  </section>`;
};

const createEventFormDetailsTemplate = (point, offers, destination) => {
  offers = offers.find((item) => item.type === point.type.toLowerCase()).offers;
  return `<section class="event__details">
  ${renderOffers(point.offers, offers)}
  ${renderDestination(destination)}
  </section>`;
};

export default class EventFormDetails extends AbstractStatefulView {
  #point = null;
  #offers = null;
  #destination = null;
  #handleOffersChange = null;


  constructor({point = BLANK_POINT, offers, destination, onOffersChange }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this._setState({point, destination});
    this.#handleOffersChange = onOffersChange;
    this._restoreHandlers();
  }

  get template() {
    return createEventFormDetailsTemplate(
      this._state.point,
      this.#offers,
      this._state.destination
    );
  }

  _restoreHandlers() {
    if (!this.#isOffersEmpty()) {
      this.element.querySelector('.event__section--offers').addEventListener('change', this.#offersCheckboxChangeHandler);
    }
  }

  resetState() {
    this.updateElement({point: this.#point, destination: this.#destination});
  }

  setNewType = (newType) => {
    const newPoint = {...this._state.point};
    newPoint.type = newType;
    newPoint.offers = [];
    this.updateElement({point: newPoint});
  };

  setNewDestination = (newDestination) => {
    this.updateElement({destination: newDestination});
  };

  #isOffersEmpty() {
    const currentOffers = this.#offers.find((item) => item.type === this._state.point.type.toLowerCase());
    return currentOffers.offers.length === 0;
  }

  #offersCheckboxChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      const newPoint = {...this._state.point};
      if (evt.target.checked) {
        newPoint.offers.push(evt.target.dataset.offerId);
      } else {
        newPoint.offers = newPoint.offers.filter((item) => item !== evt.target.dataset.offerId);
      }
      this._setState({point: newPoint});
      this.#handleOffersChange(newPoint.offers);
    }
  };
}
