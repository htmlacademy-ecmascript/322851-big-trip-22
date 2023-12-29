import { BLANK_POINT } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createOffersList = (selectedOffers, offers) => offers.map((offer) => {
  const isChecked = (selectedOffers.some((id) => id === offer.id)) ? 'checked' : '';
  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${isChecked}>
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

const renderPictures = (pictures) => pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('');

const renderDestination = (destination) => {
  if (!destination) {
    return '';
  }
  return `<section class="event__section  event__section--destination">
<h3 class="event__section-title  event__section-title--destination">Destination</h3>
<p class="event__destination-description">${destination.description}</p>

<div class="event__photos-container">
  <div class="event__photos-tape">
    ${renderPictures(destination.pictures)}
  </div>
</div>
</section>`;
};

const createEventFormDetailsTemplate = (point, offers, destination) => {
  offers = offers.find((item) => item.type === point.type.toLocaleLowerCase()).offers;
  console.log(destination);
  return `<section class="event__details">
  ${renderOffers(point.offers, offers)}
  ${renderDestination(destination)}
  </section>`;
};


export default class EventFormDetails extends AbstractStatefulView {
  #point = null;
  #offers = null;
  #destination = null;

  constructor({point = BLANK_POINT, offers, destination }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this._setState({point, destination});
  }

  get template() {
    return createEventFormDetailsTemplate(this._state.point, this.#offers, this._state.destination);
  }

  _restoreHandlers() {

  }

  setNewType(newType) {
    const newPoint = {...this._state.point};
    newPoint.type = newType;
    newPoint.offers = [];
    this.updateElement({point: newPoint});
  }
}
