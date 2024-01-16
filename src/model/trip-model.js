import { getRandomTripPoints } from '../mock/trip-points.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';
import { updateItem } from '../utils.js';
import Observable from '../framework/observable.js';
import { UpdateTypes } from '../const.js';

export default class TripsModel extends Observable {
  #tripPoints = null;
  #destinations = null;
  #offers = null;
  #apiService = null;

  constructor({ apiService: apiService }) {
    super();
    this.#apiService = apiService;
  }

  async init() {
    try {
      const points = await this.#apiService.tripPoints;
      this.#tripPoints = points.map(this.#adaptPointToClient);
      this.#destinations = await this.#apiService.destinations;
      this.#offers = await this.#apiService.offers;

    } catch {
      this.#tripPoints = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateTypes.INIT);
  }

  #adaptPointToClient(point) {
    const newPoint = {
      ...point,
      basePrice: point['base_price'],
      dateTo: point['date_to'],
      dateFrom: point['date_from'],
      isFavorite: point['is_favorite']
    };

    delete newPoint['base_price'];
    delete newPoint['date_to'];
    delete newPoint['date_from'];
    delete newPoint['is_favorite'];

    return newPoint;
  }

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
