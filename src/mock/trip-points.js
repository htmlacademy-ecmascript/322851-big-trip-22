import { TRIP_TYPES, TRIP_NUM } from '../const.js';
import { generateRandomIndex, getRandomArrayElement, getRandomInteger } from '../utils.js';
import { mockDestinations } from './destination.js';
import { mockOffers } from './offers.js';


const generateOffers = (type) => {
  const offers = mockOffers.filter((item) => item.type === type.toLowerCase())[0].offers;
  const generateIndex = generateRandomIndex(0, offers.length - 1);
  return (offers) ? Array.from({length: getRandomInteger(0, offers.length)}, () => offers[generateIndex()]?.id) : [];
};


const mockTripPoints = [
  {
    'id': 1,
    'type': TRIP_TYPES[1],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': new Date('09/25/24 09:00').toISOString(),
    'dateTo': new Date('09/25/24 09:50').toISOString(),
    'basePrice': 100,
    'offers': generateOffers(TRIP_TYPES[1]),
    'isFavorite': true
  },
  { 'id': 2,
    'type': TRIP_TYPES[2],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': new Date('10/01/24 10:20').toISOString(),
    'dateTo': new Date('10/01/24 22:00').toISOString(),
    'basePrice': 1150,
    'offers': generateOffers(TRIP_TYPES[2]),
    'isFavorite': false
  },
  {
    'id': 3,
    'type': TRIP_TYPES[3],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': new Date('10/03/24 11:50').toISOString(),
    'dateTo': new Date('10/05/24 13:00').toISOString(),
    'basePrice': 12000,
    'offers': generateOffers(TRIP_TYPES[3]),
    'isFavorite': true
  },
  {
    'id': 4,
    'type': TRIP_TYPES[4],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': new Date('10/05/24 14:00').toISOString(),
    'dateTo': new Date('10/09/24 14:50').toISOString(),
    'basePrice': 140,
    'offers': generateOffers(TRIP_TYPES[4]),
    'isFavorite': false
  },
  {
    'id': 5,
    'type': TRIP_TYPES[5],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': new Date('10/10/24 16:00').toISOString(),
    'dateTo': new Date('11/05/24 16:00').toISOString(),
    'basePrice': 1600,
    'offers': generateOffers(TRIP_TYPES[5]),
    'isFavorite': true
  },
  {
    'id': 6,
    'type': TRIP_TYPES[7],
    'destination': getRandomArrayElement(mockDestinations).id,
    'dateFrom': new Date('11/12/24 22:00').toISOString(),
    'dateTo': new Date('11/15/24 22:40').toISOString(),
    'basePrice': 189,
    'offers': generateOffers(TRIP_TYPES[6]),
    'isFavorite': false
  }
];

const getRandomTripPoints = () => {
  const generateIndex = generateRandomIndex(0, mockTripPoints.length - 1);
  return Array.from({length: TRIP_NUM}, () => mockTripPoints[generateIndex()]);
};

export { getRandomTripPoints };
