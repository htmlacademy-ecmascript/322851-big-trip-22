import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createButtonTemplate = ({ isDisabled }) => `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${(isDisabled) ? 'disabled' : ''}>New event</button>`;


export default class NewEventButton extends AbstractStatefulView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this._setState({isDisabled: false});
    this._restoreHandlers();
  }

  get template() {
    return createButtonTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#newEventButtonClickHandler);
  }

  #newEventButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
