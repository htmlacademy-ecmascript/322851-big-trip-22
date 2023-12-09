import { createElement } from '../render.js';

const createTripInfoTemplate = () => ('<section class="trip-main__trip-info  trip-info"></section>');


export default class TripInfo {
  getTemplate() {
    return createTripInfoTemplate();
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
