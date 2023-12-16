import { getRandomTripPoints } from '../mock/trip-points.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';

export default class TripsModel {
  tripPoints = getRandomTripPoints();
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
