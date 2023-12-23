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
import { render, RenderPosition, replace } from '../framework/render.js';
import { filters, isEscapeKey } from '../utils.js';
import ArrowButton from '../view/event-form-arrow-button.js';
import EventFormDeleteButton from '../view/event-form-delete-button.js';

export default class BodyPresenter {
  #listComponent = new TripList();
  #tripInfoContainer = new TripInfo();
  #mainElement = document.querySelector('.trip-main');
  #filterContainer = document.querySelector('.trip-controls__filters');
  #listContainer = null;
  #tripsModel = null;
  #tripsPoints = null;

  constructor({ container, tripsModel }) {
    this.#listContainer = container;
    this.#tripsModel = tripsModel;
    this.#tripsPoints = [...this.#tripsModel.tripPoints];
  }

  init() {
    this.#renderBody();
  }

  #renderBody() {
    render(this.#tripInfoContainer, this.#mainElement, RenderPosition.AFTERBEGIN);
    render(new TripTitle(), this.#tripInfoContainer.element);
    render(new TotalCost(), this.#tripInfoContainer.element);
    render(new FilterForm({'filters': this.#generateFilters() }), this.#filterContainer);
    render(new SortForm(), this.#listContainer);
    render(this.#listComponent, this.#listContainer);

    for (let i = 0; i < this.#tripsPoints.length; i++) {
      this.#renderTripPoint(this.#tripsPoints[i]);
    }
  }

  #generateFilters() {
    return Object.entries(filters).map(([ filterName, cb ]) => ({'name': filterName, count: cb(this.#tripsPoints).length}));
  }

  #renderTripPoint(point) {
    const content = {
      point: point,
      destination: this.#tripsModel.getDestinations(point.destination),
      offers: this.#tripsModel.getOffers(point.type)
    };

    function escKeyDownHandler(evt) {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    const eventForm = new EventForm({onSubmit: () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }});

    const eventFormElement = eventForm.element.querySelector('form');

    const formHeader = new EventFormHeader({point: content.point, destinations: this.#tripsModel.getDestinations()});

    const formDetails = new EventFormDetails({point: content.point, offers: this.#tripsModel.getOffers(), destination: content.destination});

    const arrowButton = new ArrowButton({ onClick: () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    } });

    const deleteButton = new EventFormDeleteButton();

    render(deleteButton, formHeader.element);
    render(arrowButton, formHeader.element);
    render(formHeader, eventFormElement);
    render(formDetails, eventFormElement);

    const tripPoint = new TripPoint({content: content, onClick: () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }
    });

    function replaceFormToPoint() {
      replace(tripPoint, eventForm);
    }

    function replacePointToForm() {
      replace(eventForm, tripPoint);
    }

    render(tripPoint, this.#listComponent.element);

  }
}
