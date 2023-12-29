import { getRandomTripPoints } from '../mock/trip-points.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';

export default class TripsModel {
  #tripPoints = getRandomTripPoints();
  #destinations = mockDestinations;
  #offers = mockOffers;

  get tripPoints() {
    return this.#tripPoints;
  }

  getDestinations(id = 'all') {
    return (id === 'all') ? this.#destinations : this.#destinations.find((item) => item.id === id);
  }

  getOffers(type = 'all') {
    return (type === 'all') ? this.#offers : this.#offers.find((item) => item.type === type.toLocaleLowerCase()).offers;
  }
}
