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

const compareDurations = (firstPoint, secondPoint) => {
  const firstPointDuration = dayjs.duration(dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom))).asMilliseconds();
  const secondPointDuration = dayjs.duration(dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom))).asMilliseconds();
  return secondPointDuration - firstPointDuration;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const filterPoints = (name, points) => {
  switch (name) {
    case FilterTypes.EVERYTHING:
      return points;
    case FilterTypes.FUTURE:
      return points.filter((item) => dayjs().isBefore(dayjs(item.dateFrom)));
    case FilterTypes.PRESENT:
      return points.filter((item) => dayjs().isBetween(dayjs(item.dateTo), dayjs(item.dateFrom)));
    case FilterTypes.PAST:
      return points.filter((item) => dayjs().isAfter(dayjs(item.dateTo)));
  }
};

const sortPoints = (name, points) => {
  switch (name) {
    case SortingTypes.DAY.name:
      points.sort((firstPoint, secondPoint) => dayjs(firstPoint.dateFrom) - dayjs(secondPoint.dateFrom));
      break;
    case SortingTypes.PRICE.name:
      points.sort((firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice);
      break;
    case SortingTypes.TIME.name:
      points.sort((firstPoint, secondPoint) => compareDurations(firstPoint, secondPoint));
      break;
  }
};

const updateItem = (items, updatedItem) => items.map((item) => item.id === updatedItem.id ? updatedItem : item);


export {
  getRandomArrayElement,
  getRandomInteger,
  generateRandomIndex,
  parseDate,
  evaluateDuration,
  isEscapeKey,
  filterPoints,
  updateItem,
  sortPoints };
