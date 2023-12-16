import { BLANK_POINT, CALENDAR_FORMAT } from '../const.js';
import { createElement } from '../render.js';
import { parseDate } from '../utils.js';

const renderDestinationOptions = (destinations) => destinations.map(({name}) => `<option value="${name}"></option>`).join('');

const createEventFormHeaderTemplate = (point, destinations) => (`<header class="event__header">
<div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
  </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      <div class="event__type-item">
        <input id="event-type-taxi-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${point.id}">Taxi</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-bus-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
        <label class="event__type-label  event__type-label--bus" for="event-type-bus-${point.id}">Bus</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-train-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
        <label class="event__type-label  event__type-label--train" for="event-type-train-${point.id}">Train</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-ship-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
        <label class="event__type-label  event__type-label--ship" for="event-type-ship-${point.id}">Ship</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-drive-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
        <label class="event__type-label  event__type-label--drive" for="event-type-drive-${point.id}">Drive</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-flight-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
        <label class="event__type-label  event__type-label--flight" for="event-type-flight-${point.id}">Flight</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-check-in-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${point.id}">Check-in</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-sightseeing-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${point.id}">Sightseeing</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-restaurant-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${point.id}">Restaurant</label>
      </div>
    </fieldset>
  </div>
</div>

<div class="event__field-group  event__field-group--destination">
  <label class="event__label  event__type-output" for="event-destination-${point.id}">
  ${point.type}
  </label>
  <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destinations.filter((item) => item.id === point.destination)[0].name}" list="destination-list-1">
  <datalist id="destination-list-1">
  ${renderDestinationOptions(destinations)}
  </datalist>
</div>

<div class="event__field-group  event__field-group--time">
  <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
  <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${parseDate(point.dateFrom, CALENDAR_FORMAT)}">
  &mdash;
  <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
  <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${parseDate(point.dateTo, CALENDAR_FORMAT)}">
</div>

<div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-${point.id}">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>
  <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${point.basePrice}">
</div>

<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
<button class="event__reset-btn" type="reset">Cancel</button>
</header>`);


export default class EventFormHeader {
  constructor({point = BLANK_POINT, destinations}) {
    this.point = point;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEventFormHeaderTemplate(this.point, this.destinations);
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
