import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createEventFormTemplate = ({isDisabled}) => (`<li class="trip-events__item">
<form class="event event--edit" action="#" method="post" ${(isDisabled) ? 'disabled' : ''}></form></li>`);


export default class EventForm extends AbstractStatefulView {
  #handleSubmit = null;

  constructor({ onSubmit }) {
    super();
    this.#handleSubmit = onSubmit;
    this._restoreHandlers();
    this._setState({'isDisabled': false});
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#closeEventForm);
  }

  get template() {
    return createEventFormTemplate(this._state);
  }

  #closeEventForm = (evt) => {
    evt.preventDefault();
  };
}
