import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { TRIP_TYPES } from '../const.js';

const mockOffers = [
  {
    type: getRandomArrayElement(TRIP_TYPES),
    name: 'Add luggage',
    price: getRandomInteger(50, 250)
  },
  {
    type: getRandomArrayElement(TRIP_TYPES),
    name: 'Upgrade to a business class',
    price: getRandomInteger(50, 250)
  },
  {
    type: getRandomArrayElement(TRIP_TYPES),
    name: 'Choose seats',
    price: getRandomInteger(50, 250)
  },
  {
    type: getRandomArrayElement(TRIP_TYPES),
    name: 'Travel by train',
    price: getRandomInteger(50, 250)
  },
  {
    type: getRandomArrayElement(TRIP_TYPES),
    name: 'Add meal',
    price: getRandomInteger(50, 250)
  }
];


export { mockOffers };
