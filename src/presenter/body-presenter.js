import TripPoint from '../view/trip-point.js';
import TripList from '../view/trip-list.js';
import SortForm from '../view/sort-form.js';
import FilterForm from '../view/filter-form.js';
import TotalCost from '../view/total-cost.js';
import TripTitle from '../view/trip-title.js';
import TripInfo from '../view/trip-info.js';
import EventForm from '../view/event-form.js';
import EventFormHeader from '../view/event-form-header.js';
import EventFormDetails from '../view/event-form-details.js';
import { render, RenderPosition } from '../render.js';

export default class BodyPresenter {
  listComponent = new TripList();
  tripInfoContainer = new TripInfo();
  eventForm = new EventForm();
  eventFormElement = this.eventForm.getElement().querySelector('form');

  constructor({ container, tripsModel }) {
    this.listContainer = container;
    this.tripsModel = tripsModel;
    this.tripsPoints = this.tripsModel.getTripPoints();
  }

  init() {
    render(this.tripInfoContainer, document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
    render(new TripTitle(), this.tripInfoContainer.getElement());
    render(new TotalCost(), this.tripInfoContainer.getElement());
    render(new FilterForm(), document.querySelector('.trip-controls__filters'));
    render(new SortForm(), this.listContainer);
    render(this.listComponent, this.listContainer);
    render(this.eventForm, this.listComponent.getElement());

    for (let i = 0; i < this.tripsPoints.length; i++) {
      const tripPoint = this.tripsPoints[i];
      const destination = this.tripsModel.getDestinations(tripPoint.destination);
      const offers = this.tripsModel.getOffers(tripPoint.type);
      const content = {
        point: tripPoint,
        destination: destination,
        offers: offers
      };
      if (i === 0) {
        render(new EventFormHeader({point: content.point, destinations: this.tripsModel.getDestinations()}), this.eventFormElement);
        render(new EventFormDetails({point: content.point, offers: this.tripsModel.getOffers(), destination: content.destination}), this.eventForm.getElement().querySelector('form'));
      } else {
        render(new TripPoint({content: content}), this.listComponent.getElement());
      }

    }
  }
}
