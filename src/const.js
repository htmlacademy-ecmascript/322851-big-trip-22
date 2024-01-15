const TRIP_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const TRIP_NUM = 5;
const IMAGES_URL = 'https://loremflickr.com/248/152?random=';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH-mm';
const DURATION_FORMAT = 'DD[D] HH[H] mm[M]';
const CALENDAR_FORMAT = 'DD/MM/YY HH:mm';

const BLANK_POINT = { 'id': 0,
  'type': TRIP_TYPES[5],
  'destination': '',
  'dateFrom': '',
  'dateTo': '',
  'basePrice': '',
  'offers': [],
  'isFavorite': false
};

const EmptyListMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now'
};

const InfoMessages = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information',
};

const FilterTypes = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST'
};

const SortingTypes = {
  DAY: {name: 'day', isDisabled: false},
  EVENT: {name: 'event', isDisabled: true},
  TIME: {name: 'time', isDisabled: false},
  PRICE: {name: 'price', isDisabled: false},
  OFFER: {name: 'offer', isDisabled: true}
};

const ModeTypes = {
  'DEFAULT': 'DEFAULT',
  'EDIT': 'EDIT',
  'NEW': 'NEW'
};

const DEFAULT_SORT_TYPE = SortingTypes.DAY.name;
const DEFAULT_FILTER_TYPE = FilterTypes.EVERYTHING;

const UserActions = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  TRIP_TYPES,
  TRIP_NUM,
  IMAGES_URL,
  DATE_FORMAT,
  TIME_FORMAT,
  DURATION_FORMAT,
  CALENDAR_FORMAT,
  BLANK_POINT,
  EmptyListMessages,
  FilterTypes,
  SortingTypes,
  DEFAULT_SORT_TYPE,
  DEFAULT_FILTER_TYPE,
  InfoMessages,
  ModeTypes,
  UserActions,
  UpdateTypes
};

