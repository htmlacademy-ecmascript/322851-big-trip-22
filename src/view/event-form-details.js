import { BLANK_POINT } from '../const.js';
import { createElement } from '../render.js';

const renderOffers = (selectedOffers, offers) => offers.map((offer) => {
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

const createEventFormDetailsTemplate = (point, offers) => {
  offers = offers.filter((item) => item.type === point.type.toLocaleLowerCase())[0].offers;
  if (!offers) {
    return '';
  }
  return `<section class="event__details">
<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

  <div class="event__available-offers">
    ${renderOffers(point.offers, offers)}
  </div>
</section>`;
};


export default class EventFormDetails {

  constructor({point = BLANK_POINT, offers }) {
    this.point = point;
    this.offers = offers;
  }

  getTemplate() {
    return createEventFormDetailsTemplate(this.point, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
