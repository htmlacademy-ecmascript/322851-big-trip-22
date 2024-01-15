import { BLANK_POINT, CALENDAR_FORMAT, ModeTypes, TRIP_TYPES, UpdateTypes, UserActions } from '../const.js';
import { getEarlierDate, parseDate } from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { nanoid } from 'nanoid';

const getUpdateType = (point, state) => {
  if (point.dateTo === state.dateTo && point.dateFrom === state.dateFrom && point.basePrice === state.basePrice) {
    return UpdateTypes.PATCH;
  }
  return UpdateTypes.MINOR;
};

const renderDestinationOptions = (destinations) => destinations.map(({name}) => `<option value="${name}"></option>`).join('');

const renderTypes = ({type, id}) => TRIP_TYPES.map((item) => {
  const isChecked = (type === item) ? 'checked' : '';
  return `<div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${isChecked}>
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-${id}">${item}</label>
  </div>`;
}).join('');

const addDate = (date, format) => (date) ? parseDate(date, format) : '';

const createButtons = (mode) => {
  if (mode === ModeTypes.EDIT) {
    return '<button class="event__reset-btn" type="reset">Delete</button><button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>';
  }
  return '<button class="event__reset-btn" type="reset">Cancel</button>';
};

const createEventFormHeaderTemplate = (point, destinations, mode) => (`<header class="event__header">
<div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
  </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${renderTypes(point)}
    </fieldset>
  </div>
</div>

<div class="event__field-group  event__field-group--destination">
  <label class="event__label  event__type-output" for="event-destination-${point.id}">
  ${point.type}
  </label>
  <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destinations.filter((item) => item.id === point.destination)[0]?.name ?? ''}" list="destination-list-${point.id}">
  <datalist id="destination-list-${point.id}">
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
  <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${point.basePrice}" pattern="[0-9]+" required>
</div>

<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  ${createButtons(mode)}
</header>`);


export default class EventFormHeader extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #handleClick = null;
  #handleTypeChange = null;
  #handleDestinationChange = null;
  #handleDelete = null;
  #handleSubmit = null;
  #mode = null;
  #dateToCalendar = null;
  #dateFromCalendar = null;


  constructor({ point = BLANK_POINT, destinations = [], mode, onTypeChange, onDestinationChange, onSubmit, onDelete, onArrowButtonClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this._setState(point);
    this.#mode = mode;
    this.#handleTypeChange = onTypeChange;
    this.#handleDestinationChange = onDestinationChange;
    this.#handleSubmit = onSubmit;
    this.#handleDelete = onDelete;
    this.#handleClick = onArrowButtonClick;
    this._restoreHandlers();
  }

  get template() {
    return createEventFormHeaderTemplate(this._state, this.#destinations, this.#mode);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTripType);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestination);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveChanges);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePrice);
    if (this.#mode === ModeTypes.EDIT) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEventForm);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deletePoint);
    } else {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#closeEventForm);
    }
    this.#setCalendar();
  }

  resetState() {
    this.updateElement(this.#point);
  }

  #setCalendar() {
    this.#dateToCalendar = flatpickr(this.element.querySelector('.event__input--time[name="event-end-time"]'), {
      minDate: getEarlierDate(Date.now(), this._state.dateFrom),
      enableTime: true,
      defaultDate: this._state.dateTo,
      dateFormat: 'd/m/y H:i',
      onChange: this.#handleDateToChange,
      ['time_24hr']: true
    });

    this.#dateFromCalendar = flatpickr(this.element.querySelector('.event__input--time[name="event-start-time"]'), {
      minDate: parseDate(Date.now()),
      enableTime: true,
      defaultDate: this._state.dateFrom,
      dateFormat: 'd/m/y H:i',
      onChange: this.#handleDateFromChange,
      ['time_24hr']: true
    });
  }

  #changeTripType = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.updateElement({type: evt.target.value});
      this.#handleTypeChange(evt.target.value);
    }
  };

  #handleDateToChange = ([dateTo]) => {
    this._setState({dateTo: new Date(dateTo).toISOString()});
  };

  #handleDateFromChange = ([dateFrom]) => {
    this._setState({dateFrom: new Date(dateFrom).toISOString()});
    this.#dateToCalendar.set('minDate', dateFrom);
  };

  #changeDestination = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
      if (newDestination) {
        this.updateElement({destination: newDestination.id});
        this.#handleDestinationChange(newDestination);
      }
    }
  };

  #changePrice = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      this._setState({basePrice: evt.target.value});
    } else {
      evt.target.value = this._state.basePrice;
    }

  };

  setNewOffers(newOffers) {
    this._setState({ offers: newOffers });
  }

  #saveChanges = (evt) => {
    evt.preventDefault();
    if (this.#mode === ModeTypes.NEW) {
      this._setState({id: nanoid()});
    }
    const actionType = (this.#mode === ModeTypes.EDIT) ? UserActions.UPDATE_EVENT : UserActions.ADD_EVENT;
    const updateType = getUpdateType(this.#point, this._state);
    this.#handleSubmit(actionType, updateType, this._state);
  };

  #closeEventForm = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  #deletePoint = (evt) => {
    evt.preventDefault();
    this.#handleDelete(this._state);
  };
}
