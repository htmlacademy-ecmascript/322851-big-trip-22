import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { DURATION_FORMAT, FilterTypes, SortingTypes } from './const';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isBetween);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateRandomIndex = (a, b) => {
  const indexNumbers = [];
  return () => {
    let currentIndex = getRandomInteger(a, b);
    if (indexNumbers.length === Math.floor(Math.max(a, b) + 1)) {
      return '';
    }
    while (indexNumbers.includes(currentIndex)) {
      currentIndex = getRandomInteger(a, b);
    }
    indexNumbers.push(currentIndex);
    return currentIndex;
  };
};

const parseDate = (date, format) => dayjs(date).format(format);

const evaluateDuration = (dateFrom, dateTo) => {
  const tripDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format(DURATION_FORMAT);
  return tripDuration.replace('00D 00H ', '').replace('00D ', '');
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const filters = {
  [FilterTypes.EVERYTHING]: (points) => points,
  [FilterTypes.FUTURE]: (points) => points.filter((item) => dayjs().isBefore(dayjs(item.dateFrom))),
  [FilterTypes.PRESENT]: (points) => points.filter((item) => dayjs().isBetween(dayjs(item.dateTo), dayjs(item.dateFrom))),
  [FilterTypes.PAST]: (points) => points.filter((item) => dayjs().isAfter(dayjs(item.dateTo)))
};

const sorting = {
  [SortingTypes.DAY.name]: (points) => points.sort((firstPoint, secondPoint) => dayjs(firstPoint.dateFrom) - dayjs(secondPoint.dateFrom)),
  [SortingTypes.PRICE.name]: (points) => points.sort((firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice),
  [SortingTypes.TIME.name]: (points) => points.sort((firstPoint, secondPoint) => dayjs(secondPoint.dateFrom) - dayjs(firstPoint.dateFrom))
};

const updateItem = (items, updatedItem) => items.map((item) => item.id === updatedItem.id ? updatedItem : item);


export {
  getRandomArrayElement,
  getRandomInteger,
  generateRandomIndex,
  parseDate,
  evaluateDuration,
  isEscapeKey,
  filters,
  updateItem,
  sorting };
