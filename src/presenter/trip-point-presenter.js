import { replace } from '../framework/render.js';
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
  #distenations = null;
  #offers = null;
  #tripPoint = null;
  #eventForm = null;

  constructor({ container, destinations, offers }) {
    this.#tripPointsContainer = container;
    this.#distenations = destinations;
    this.#offers = offers;
  }

  init(content) {
    this.#content = content;

    const previousTripPoint = null;
    const previousEventForm = null;

    this.#renderTripPoint();

  }

  #renderTripPoint() {
    this.#createEventForm();
    this.#tripPoint = new TripPoint({content: this.#content, onClick: () => {
      this.#replacePointToForm();
      document.addEventListener('keydown', this.#escKeyDownHandler);
    }
    });

    render(this.#tripPoint, this.#tripPointsContainer);

  }

  #createEventForm() {
    this.#eventForm = new EventForm({onSubmit: () => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }});

    const eventFormElement = this.#eventForm.element.querySelector('form');

    const formHeader = new EventFormHeader({point: this.#content.point, destinations: this.#distenations});

    const formDetails = new EventFormDetails({point: this.#content.point, offers: this.#offers, destination: this.#content.destination});

    const arrowButton = new ArrowButton({ onClick: () => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    } });

    const deleteButton = new EventFormDeleteButton();

    render(deleteButton, formHeader.element);
    render(arrowButton, formHeader.element);
    render(formHeader, eventFormElement);
    render(formDetails, eventFormElement);
  }

  #replaceFormToPoint() {
    replace(this.#tripPoint, this.#eventForm);
  }

  #replacePointToForm() {
    replace(this.#eventForm, this.#tripPoint);
  }


  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

}
