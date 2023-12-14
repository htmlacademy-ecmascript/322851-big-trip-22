import { TRIP_TYPES } from '../const.js';
import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { mockDestinations } from './destination.js';
import { mockOffers } from './offers.js';

const indexGenerate =  generateRandomIndex(0, 5);

const mockTripPoints = [
  {
    type: getRandomArrayElement(TRIP_TYPES),
    destination: getRandomArrayElement(mockDestinations).id,
    startDate: '25/09/2024 09:00',
    finishDate: '30/09/2024 09:35',
    cost: 100,
    offers: Array.from({length: getRandomInteger(0, 5)}, getRandomArrayElement(mockOffers).id),
    isFavorite: true
  },
  {
    type: getRandomArrayElement(TRIP_TYPES),
    destination: getRandomArrayElement(mockDestinations).id,
    startDate: '01/10/2024 10:20',
    finishDate: '01/10/2024 22:00',
    cost: 1150,
    offers: Array.from({length: getRandomInteger(0, 5)}, mockOffers[].id),
    isFavorite: false
  },
  {
    type: getRandomArrayElement(TRIP_TYPES),
    destination: getRandomArrayElement(mockDestinations).id,
    startDate: '03/10/2024 11:50',
    finishDate: '05/10/2024 13:00',
    cost: 12000,
    offers: Array.from({length: getRandomInteger(0, 5)}, getRandomArrayElement(mockOffers).id),
    isFavorite: true
  },
  {
    type: getRandomArrayElement(TRIP_TYPES),
    destination: getRandomArrayElement(mockDestinations).id,
    startDate: '05/10/2024 14:00',
    finishDate: '09/10/2024 14:00',
    cost: 140,
    offers: [],
    isFavorite: false
  },
  {
    type: getRandomArrayElement(TRIP_TYPES),
    destination: getRandomArrayElement(mockDestinations).id,
    startDate: '10/10/2024 16:00',
    finishDate: '12/11/2024 16:00',
    cost: 1600,
    offers: Array.from({length: getRandomInteger(0, 5)}, getRandomArrayElement(mockOffers).id),
    isFavorite: true
  },
  {
    type: getRandomArrayElement(TRIP_TYPES),
    destination: getRandomArrayElement(mockDestinations).id,
    startDate: '12/11/2024 22:00',
    finishDate: '14/11/2024 22:00',
    cost: 189,
    offers: [],
    isFavorite: false
  }
];
