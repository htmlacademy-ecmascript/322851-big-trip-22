import { getRandomTripPoints } from '../mock/trip-points.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';
import { updateItem } from '../utils.js';
import Observable from '../framework/observable.js';

export default class TripsModel extends Observable {
  #tripPoints = getRandomTripPoints();
  #destinations = mockDestinations;
  #offers = mockOffers;

  get tripPoints() {
    return this.#tripPoints;
  }

  set tripPoints(points) {
    this.#tripPoints = [...points];
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getContentById(id) {
    const point = this.#tripPoints.find((item) => item.id === id);
    const destination = this.#destinations.find((item) => item.id === point.destination);
    const offers = this.#offers.find((item) => item.type === point.type.toLocaleLowerCase());
    return {
      point: point ?? {},
      destination: destination ?? {},
      offers: offers.offers ?? {}
    };
  }

  updatePoint(updateType, updatedPoint) {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);

    this._notify(updateType, updatedPoint.id);
  }

  addPoint(updateType, newPoint) {
    this.#tripPoints.push(newPoint);

    this._notify(updateType);
  }

  deletePoint(updateType, point) {
    this.#tripPoints = this.#tripPoints.filter((item) => item.id !== point.id);

    this._notify(updateType);
  }
}
