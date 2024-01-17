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

  async updatePoint(updateType, updatedPoint) {
    try {
      const newPoint = await this.#apiService.updatePoint(updatedPoint);

      this.#tripPoints = updateItem(this.#tripPoints, this.#adaptPointToClient(newPoint));

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
      const response = await this.#apiService.deletePoint(deletedPoint);
      if (response.ok) {
        this.#tripPoints = this.#tripPoints.filter((item) => item.id !== deletedPoint.id);

        this._notify(updateType);
      }
    } catch(err) {
      throw new Error('Can\'t delete point');
    }


  }
}
