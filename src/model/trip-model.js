import { getRandomTripPoint } from '../mock/trip.js';
import { TRIP_NUM } from '../const.js';

export default class TripsModel {
  tripPoints = Array.from({length: TRIP_NUM}, getRandomTripPoint);

  getTripPoints() {
    return this.tripPoints;
  }
}
