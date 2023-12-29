import AbstractView from '../framework/view/abstract-view.js';

const createEventFormTemplate = () => (`<li class="trip-events__item">
<form class="event event--edit" action="#" method="post"></form></li>`);


export default class EventForm extends AbstractView {
  #handleSubmit = null;

  constructor({ onSubmit }) {
    super();
    this.#handleSubmit = onSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#closeEventForm);

  }

  get template() {
    return createEventFormTemplate();
  }

  #closeEventForm = (evt) => {
    evt.preventDefault();
    this.#handleSubmit();
  };
}
