import { TRIP_TYPES } from '../const.js';
import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { mockDestinations } from './destination.js';
import { mockOffers } from './offers.js';


const generateOffers = (type) => {
  const offers = mockOffers.filter((item) => item.type === type.toLowerCase())[0].offers;
  return (offers) ? Array.from({length: getRandomInteger(0, offers.length)}, () => getRandomArrayElement(offers)?.id) : [];
};


const mockTripPoints = [
  {
    'id': 1,
    'type': TRIP_TYPES[1],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': '25/09/2024 09:00',
    'dateTo': '30/09/2024 09:35',
    'basePrice': 100,
    'offers': generateOffers(TRIP_TYPES[1]),
    'isFavorite': true
  },
  { 'id': 2,
    'type': TRIP_TYPES[2],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': '01/10/2024 10:20',
    'dateTo': '01/10/2024 22:00',
    'basePrice': 1150,
    'offers': generateOffers(TRIP_TYPES[2]),
    'isFavorite': false
  },
  {
    'id': 3,
    'type': TRIP_TYPES[3],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': '03/10/2024 11:50',
    'dateTo': '05/10/2024 13:00',
    'basePrice': 12000,
    'offers': generateOffers(TRIP_TYPES[3]),
    'isFavorite': true
  },
  {
    'id': 4,
    'type': TRIP_TYPES[4],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': '05/10/2024 14:00',
    'dateTo': '09/10/2024 14:00',
    'basePrice': 140,
    'offers': generateOffers(TRIP_TYPES[4]),
    'isFavorite': false
  },
  {
    'id': 5,
    'type': TRIP_TYPES[5],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': '10/10/2024 16:00',
    'dateTo': '12/11/2024 16:00',
    'basePrice': 1600,
    'offers': generateOffers(TRIP_TYPES[5]).offers,
    'isFavorite': true
  },
  {
    'id': 6,
    'type': TRIP_TYPES[6],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': '12/11/2024 22:00',
    'dateTo': '14/11/2024 22:00',
    'basePrice': 189,
    'offers': generateOffers(TRIP_TYPES[6]),
    'isFavorite': false
  }
];

const getRandomTripPoint = () => getRandomArrayElement(mockTripPoints);

export { getRandomTripPoint };
