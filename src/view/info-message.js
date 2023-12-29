import AbstractView from '../framework/view/abstract-view';

const createEmptyTripListTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class InfoMessage extends AbstractView {
  #message = null;

  constructor({ message }) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmptyTripListTemplate(this.#message);
  }
}
