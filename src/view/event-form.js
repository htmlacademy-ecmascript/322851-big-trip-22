import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createEventFormTemplate = ({isDisabled}) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post" ${(isDisabled) ? 'disabled' : ''}>
    </form>
  </li>`
);


export default class EventForm extends AbstractStatefulView {

  constructor() {
    super();
    this._restoreHandlers();
    this._setState({'isDisabled': false});
  }

  get template() {
    return createEventFormTemplate(this._state);
  }

  _restoreHandlers() {
  }


}
