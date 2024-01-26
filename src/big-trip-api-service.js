import ApiService from './framework/api-service.js';
import { ApiMethod } from './const.js';


export default class BigTripApiService extends ApiService {

  get tripPoints() {
    return this._load({url: 'points'}).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: ApiMethod.PUT,
      body: JSON.stringify(this.#adaptPointToServer(point)),
      headers: new Headers({'content-type': 'application/json'})
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: ApiMethod.POST,
      body: JSON.stringify(this.#adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: ApiMethod.DELETE
    });
    return response;
  }

  #adaptPointToServer(point) {
    const newPoint = {
      ...point,
      'base_price': parseInt(point.basePrice, 10),
      'date_to': point.dateTo,
      'date_from': point.dateFrom,
      'is_favorite': point.isFavorite
    };

    delete newPoint.basePrice;
    delete newPoint.dateTo;
    delete newPoint.dateFrom;
    delete newPoint.isFavorite;
    return newPoint;
  }
}
