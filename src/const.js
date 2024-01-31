const TRIP_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const BASE_URL = 'https://21.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION_STRING = 'Basic 322851bigtrip22';


const BLANK_POINT = {
  'type': TRIP_TYPES[5].toLowerCase(),
  'destination': '',
  'dateFrom': null,
  'dateTo': null,
  'basePrice': 0,
  'offers': [],
  'isFavorite': false
};

const EmptyListMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now'
};

const DateFormat = {
  DATE:'MMM DD',
  TIME: 'HH:mm',
  DURATION: 'DD[D] HH[H] mm[M]',
  CALENDAR: 'DD/MM/YY HH:mm'
};

const InfoMessageByAction = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST'
};

const SortingType = {
  DAY: {name: 'day', isDisabled: false},
  EVENT: {name: 'event', isDisabled: true},
  TIME: {name: 'time', isDisabled: false},
  PRICE: {name: 'price', isDisabled: false},
  OFFER: {name: 'offer', isDisabled: true}
};

const ModeType = {
  'DEFAULT': 'DEFAULT',
  'EDIT': 'EDIT',
  'NEW': 'NEW'
};

const DEFAULT_SORT_TYPE = SortingType.DAY.name;
const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const ApiMethod = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const BlockerTimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


export {
  TRIP_TYPES,
  DateFormat,
  BLANK_POINT,
  EmptyListMessage,
  FilterType,
  SortingType,
  DEFAULT_SORT_TYPE,
  DEFAULT_FILTER_TYPE,
  InfoMessageByAction,
  ModeType,
  UserAction,
  UpdateType,
  BASE_URL,
  AUTHORIZATION_STRING,
  ApiMethod,
  BlockerTimeLimit
};

