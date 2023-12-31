import { BLANK_POINT, CALENDAR_FORMAT, TRIP_TYPES } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { parseDate } from '../utils.js';

const renderDestinationOptions = (destinations) => destinations.map(({name}) => `<option value="${name}"></option>`).join('');

const renderOptions = ({type, id}) => TRIP_TYPES.map((item) => {
  const isChecked = (type === item) ? 'checked' : '';
  return `<div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}" ${isChecked}>
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-${id}">${item}</label>
  </div>`;
}).join('');

const addDate = (date, format) => (date) ? parseDate(date, format) : '';

const createEventFormHeaderTemplate = (point, destinations) => (`<header class="event__header">
<div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
  </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${renderOptions(point)}
    </fieldset>
  </div>
</div>

<div class="event__field-group  event__field-group--destination">
  <label class="event__label  event__type-output" for="event-destination-${point.id}">
  ${point.type}
  </label>
  <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destinations.filter((item) => item.id === point.destination)[0]?.name ?? ''}" list="destination-list-1">
  <datalist id="destination-list-1">
  ${renderDestinationOptions(destinations)}
  </datalist>
</div>

<div class="event__field-group  event__field-group--time">
  <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
  <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${addDate(point.dateFrom, CALENDAR_FORMAT)}">
  &mdash;
  <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
  <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${addDate(point.dateTo, CALENDAR_FORMAT)}">
</div>

<div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-${point.id}">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>
  <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${point.basePrice}">
</div>

<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
</header>`);


export default class EventFormHeader extends AbstractView {
  #point = null;
  #destinations = null;
  #handleClick = null;

  constructor({ point = BLANK_POINT, destinations = []}) {
    super();
    this.#point = point;
    this.#destinations = destinations;

  }

  get template() {
    return createEventFormHeaderTemplate(this.#point, this.#destinations);
  }

  #closeEventForm = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

}
