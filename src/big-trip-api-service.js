import ApiService from './framework/api-service.js';
import { ApiMethods } from './const.js';


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
      method: ApiMethods.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'content-type': 'application/json'})
    }).then(ApiService.parseResponse);
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: ApiMethods.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: ApiMethods.DELETE,
      headers: new Headers({'content-type': 'application/json'})
    }).then(ApiService.parseResponse);
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }
}
