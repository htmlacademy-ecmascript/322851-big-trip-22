import { getRandomTripPoint } from '../mock/trips-points.js';
import { TRIP_NUM } from '../const.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';

export default class TripsModel {
  tripPoints = Array.from({length: TRIP_NUM}, getRandomTripPoint);
  destinations = mockDestinations;
  offers = mockOffers;

  getTripPoints() {
    return this.tripPoints;
  }

  getDestinations(id = 'all') {
    return (id === 'all') ? this.destinations : this.destinations.filter((item) => item.id === id)[0];
  }

  getOffers(type = 'all') {
    return (type === 'all') ? this.offers : this.offers.filter((item) => item.type === type.toLocaleLowerCase())[0].offers;
  }
}
