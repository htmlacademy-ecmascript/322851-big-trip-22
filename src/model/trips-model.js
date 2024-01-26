import { updateItem } from '../utils.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class TripsModel extends Observable {
  #tripPoints = null;
  #destinations = null;
  #offers = null;
  #apiService = null;

  constructor({ apiService }) {
    super();
    this.#apiService = apiService;
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

  async init() {
    try {
      const points = await this.#apiService.tripPoints;
      this.tripPoints = points.map(this.#adaptPointToClient);
      this.#destinations = await this.#apiService.destinations;
      this.#offers = await this.#apiService.offers;
      this._notify(UpdateType.INIT);
    } catch {
      this.#tripPoints = [];
      this.#destinations = [];
      this.#offers = [];
      this._notify(UpdateType.ERROR);
    }
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

  async updatePoint(updateType, updatedPoint) {
    try {
      const response = await this.#apiService.updatePoint(updatedPoint);
      const newPoint = this.#adaptPointToClient(response);
      this.tripPoints = updateItem(this.#tripPoints, newPoint);

      this._notify(updateType, newPoint.id);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, addedPoint) {
    try {
      const newPoint = await this.#apiService.addPoint(addedPoint);

      this.#tripPoints.push(this.#adaptPointToClient(newPoint));

      this._notify(updateType, newPoint.id);

    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, deletedPoint) {
    try {
      await this.#apiService.deletePoint(deletedPoint);

      this.#tripPoints = this.tripPoints.filter((item) => item.id !== deletedPoint.id);

      this._notify(updateType);

    } catch(err) {
      throw new Error('Can\'t delete point');
    }
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
}
