import { remove, replace } from '../framework/render.js';
import { render } from '../framework/render.js';
import EventForm from '../view/event-form.js';
import EventFormHeader from '../view/event-form-header.js';
import EventFormDetails from '../view/event-form-details.js';
import TripPoint from '../view/trip-point.js';
import ArrowButton from '../view/event-form-arrow-button.js';
import EventFormDeleteButton from '../view/event-form-delete-button.js';
import { isEscapeKey } from '../utils';

export default class TripPointPresenter {
  #tripPointsContainer = null;
  #content = null;
  #handleChange = null;
  #destinations = null;
  #offers = null;
  #tripPointComponent = null;
  #eventFormComponent = null;
  #eventFormElement = null;
  #arrowButton = null;
  #deleteButton = null;
  #formDetails = null;
  #formHeader = null;
  #handleModeChange = null;
  #editStatus = false;

  constructor({ container, destinations, offers, onDataChange, onModeChange }) {
    this.#tripPointsContainer = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(content) {
    this.#content = content;

    const previousTripPoint = this.#tripPointComponent;
    const previousEventForm = this.#eventFormComponent;

    this.#createTripPoint();
    this.#createEventForm();

    if (previousEventForm === null || previousTripPoint === null) {
      render(this.#tripPointComponent, this.#tripPointsContainer);
    } else {
      if (this.#tripPointsContainer.contains(previousTripPoint.element)) {
        replace(this.#tripPointComponent, previousTripPoint);
      }

      if (this.#editStatus && this.#tripPointsContainer.contains(previousEventForm.element)) {
        replace(this.#eventFormComponent, previousEventForm);
      }

      remove(previousTripPoint);
      remove(previousEventForm);
    }
  }

  #createTripPoint() {
    this.#tripPointComponent = new TripPoint({
      content: this.#content,
      onArrowButtonClick: this.#openForm,
      onFavoriteClick: this.#handleFavoriteStatusChange
    });
  }

  #openForm = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #closeForm = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #createEventForm() {
    this.#eventFormComponent = new EventForm({onSubmit: this.#closeForm});

    this.#eventFormElement = this.#eventFormComponent.element.querySelector('form');

    this.#formHeader = new EventFormHeader({
      point: this.#content.point,
      destinations: this.#destinations,
      onTypeChange: this.#handleTypeChange,
      onDestinationChange: this.#handleDestinationChange
    });

    this.#formDetails = new EventFormDetails({
      point: this.#content.point,
      offers: this.#offers,
      destination: this.#content.destination
    });

    this.#arrowButton = new ArrowButton({ onClick: this.#closeForm});

    this.#deleteButton = new EventFormDeleteButton();

    render(this.#deleteButton, this.#formHeader.element);
    render(this.#arrowButton, this.#formHeader.element);
    render(this.#formHeader, this.#eventFormElement);
    render(this.#formDetails, this.#eventFormElement);
  }

  #replaceFormToPoint() {
    this.#editStatus = false;
    replace(this.#tripPointComponent, this.#eventFormComponent);
  }

  #replacePointToForm() {
    this.#editStatus = true;
    this.#handleModeChange(this.#content.point.id);
    replace(this.#eventFormComponent, this.#tripPointComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFavoriteStatusChange = () => {
    const newContent = {...this.#content};
    newContent.point.isFavorite = !this.#content.point.isFavorite;
    this.#handleChange(newContent);
  };

  #handleTypeChange = (newType) => {
    this.#formDetails.setNewType(newType);
  };

  #handleDestinationChange = (newDestination) => {
    this.#formDetails.setNewDestination(newDestination);
  };

  resetView = () => {
    if (this.#editStatus) {
      this.#closeForm();
    }
  };

  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#eventFormComponent);
  }

}
