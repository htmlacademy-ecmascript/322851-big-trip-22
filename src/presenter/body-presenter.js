import TripPoint from '../view/trip-point.js';
import TripList from '../view/trip-list.js';
import SortForm from '../view/sort-form.js';
import FilterForm from '../view/filter-form.js';
import TotalCost from '../view/total-cost.js';
import TripTitle from '../view/trip-title.js';
import TripInfo from '../view/trip-info.js';
import EventForm from '../view/event-form.js';
import EventFormHeader from '../view/event-form-header.js';
import EventFormDestination from '../view/event-form-destination.js';
import EventFormDetails from '../view/event-form-details.js';
import { render, RenderPosition } from '../render.js';

export default class BodyPresenter {
  listComponent = new TripList();
  tripInfoContainer = new TripInfo();
  eventForm = new EventForm();

  constructor({ container, tripsModel }) {
    this.listContainer = container;
    this.tripPoints = [...tripsModel.getTripPoints()];
  }

  init() {
    render(this.tripInfoContainer, document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
    render(new TripTitle(), this.tripInfoContainer.getElement());
    render(new TotalCost(), this.tripInfoContainer.getElement());
    render(new FilterForm(), document.querySelector('.trip-controls__filters'));
    render(new SortForm(), this.listContainer);
    render(this.listComponent, this.listContainer);
    render(this.eventForm, this.listComponent.getElement());
    render(new EventFormHeader(), this.eventForm.getElement().querySelector('form'));
    render(new EventFormDetails(), this.eventForm.getElement().querySelector('form'));
    render(new EventFormDestination(), this.eventForm.getElement().querySelector('form'));

    for (let i = 0; i < 3; i++) {
      render(new TripPoint(), this.listComponent.getElement());
    }
  }
}
