import { RenderPosition, remove, replace } from '../framework/render.js';
import { render } from '../framework/render.js';
import EventForm from '../view/event-form.js';
import EventFormHeader from '../view/event-form-header.js';
import EventFormDetails from '../view/event-form-details.js';
import TripPoint from '../view/trip-point.js';
import { isEscapeKey } from '../utils';
import { BLANK_POINT, ModeType,UpdateType, UserAction } from '../const.js';

export default class TripPointPresenter {
  #tripPointsContainer = null;
  #content = null;
  #handleChange = null;
  #destinations = null;
  #offers = null;
  #tripPointComponent = null;
  #eventFormComponent = null;
  #eventFormElement = null;
  #formDetails = null;
  #formHeader = null;
  #handleModeChange = null;
  #mode = null;
  #handleCancelButtonClick = null;

  constructor({ container, destinations, offers, onDataChange, onModeChange, onCancelButtonClick, mode }) {
    this.#tripPointsContainer = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#handleCancelButtonClick = onCancelButtonClick;
    this.#mode = mode;
  }

  init(content) {
    if (this.#mode === ModeType.NEW) {
      this.#content = {
        point: BLANK_POINT,
        destination: null,
        offers: null
      };
      this.#createEventForm();
      document.addEventListener('keydown', this.#escapeKeyDownHandler);
      render(this.#eventFormComponent, this.#tripPointsContainer, RenderPosition.AFTERBEGIN);
    } else {
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

        if (this.#tripPointsContainer.contains(previousEventForm.element)) {
          replace(this.#tripPointComponent, previousEventForm);
        }

        remove(previousTripPoint);
        remove(previousEventForm);
      }
    }
  }

  setSavingMode() {
    if (this.#mode !== ModeType.DEFAULT) {
      this.#formHeader.updateElement({
        isSaving: true
      });
      this.#eventFormComponent.updateElement({
        isDisabled: true
      });
      this.#eventFormElement = this.#eventFormComponent.element.querySelector('form');
      render(this.#formHeader, this.#eventFormElement);
      render(this.#formDetails, this.#eventFormElement);

    }
  }

  setDeletingMode() {
    if (this.#mode !== ModeType.DEFAULT) {
      this.#eventFormComponent.updateElement({
        isDisabled: true
      });
      this.#eventFormElement = this.#eventFormComponent.element.querySelector('form');
      render(this.#formHeader, this.#eventFormElement);
      render(this.#formDetails, this.#eventFormElement);
      this.#formHeader.updateElement({
        isDeleting: true
      });
    }
  }

  setAborting() {
    const resetFormElement = () => {
      this.#eventFormComponent.updateElement({
        isDisabled: false
      });
      this.#eventFormElement = this.#eventFormComponent.element.querySelector('form');
      render(this.#formHeader, this.#eventFormElement);
      render(this.#formDetails, this.#eventFormElement);
      this.#formHeader.updateElement({
        isDeleting: false,
        isSaving: false
      });
    };
    if (this.#mode !== ModeType.DEFAULT) {
      this.#eventFormComponent.shake(resetFormElement);
    } else {
      this.#tripPointComponent.shake();
    }
  }

  resetView = () => {
    if (this.#mode !== ModeType.DEFAULT) {
      this.#closeForm();
    }
  };

  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#eventFormComponent);
  }

  #createTripPoint() {
    this.#tripPointComponent = new TripPoint({
      content: this.#content,
      onArrowButtonClick: this.#openForm,
      onFavoriteClick: this.#handleFavoriteStatusChange
    });
  }

  #createEventForm() {
    this.#eventFormComponent = new EventForm();

    this.#eventFormElement = this.#eventFormComponent.element.querySelector('form');

    this.#formHeader = new EventFormHeader({
      point: this.#content.point,
      destinations: this.#destinations,
      onTypeChange: this.#handleTypeChange,
      onDestinationChange: this.#handleDestinationChange,
      onSubmit: this.#handleSubmit,
      onDelete: this.#handleDelete,
      onArrowButtonClick: this.#closeForm,
      mode: (this.#mode === ModeType.DEFAULT) ? ModeType.EDIT : this.#mode
    });

    this.#formDetails = new EventFormDetails({
      point: this.#content.point,
      offers: this.#offers,
      destination: this.#content.destination,
      onOffersChange: this.#handleOffersChange
    });

    render(this.#formHeader, this.#eventFormElement);
    render(this.#formDetails, this.#eventFormElement);
  }

  #openForm = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escapeKeyDownHandler);
  };

  #closeForm = () => {
    if (this.#mode === ModeType.NEW) {
      remove(this.#eventFormComponent);
      this.#handleCancelButtonClick();
    } else {
      this.#replaceFormToPoint();
      this.#formHeader.resetState();
      this.#formDetails.resetState();
    }
    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
  };

  #replaceFormToPoint() {
    this.#mode = ModeType.DEFAULT;
    replace(this.#tripPointComponent, this.#eventFormComponent);
  }

  #replacePointToForm() {
    this.#mode = ModeType.EDIT;
    this.#handleModeChange(this.#content.point.id);
    replace(this.#eventFormComponent, this.#tripPointComponent);
  }

  #escapeKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closeForm();
    }
  };

  #handleFavoriteStatusChange = (actionType, updateType) => {
    const newPoint = {...this.#content.point};
    newPoint.isFavorite = !this.#content.point.isFavorite;
    this.#handleChange(actionType, updateType, newPoint);
  };

  #handleTypeChange = (newType) => {
    this.#formDetails.setNewType(newType);
  };

  #handleDestinationChange = (newDestination) => {
    this.#formDetails.setNewDestination(newDestination);
  };

  #handleOffersChange = (newOffers) => {
    this.#formHeader.setNewOffers(newOffers);
  };

  #handleDelete = (point) => {
    this.#handleChange(UserAction.DELETE_EVENT, UpdateType.MINOR, point);
  };

  #handleSubmit = (actionType, updateType, newPoint) => {
    this.#handleChange(actionType, updateType, newPoint);
  };
}
