import AbstractView from '../framework/view/abstract-view';

const createArrowButtonTemplate = () => '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>';

export default class EventFormArrowButton extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#closeEventForm);
  }

  get template() {
    return createArrowButtonTemplate();
  }

  #closeEventForm = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
