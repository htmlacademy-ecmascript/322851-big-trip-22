import AbstractView from '../framework/view/abstract-view.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createEventFormTemplate = () => (`<li class="trip-events__item">
<form class="event event--edit" action="#" method="post"></form></li>`);


export default class EventForm extends AbstractStatefulView {
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
