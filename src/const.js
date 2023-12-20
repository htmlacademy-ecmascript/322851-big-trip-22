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

export {
  TRIP_TYPES,
  TRIP_NUM,
  IMAGES_URL,
  DATE_FORMAT,
  TIME_FORMAT,
  DURATION_FORMAT,
  CALENDAR_FORMAT,
  BLANK_POINT
};

