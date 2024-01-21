import TripList from '../view/trip-list.js';
import SortForm from '../view/sort-form.js';
import { render, replace, remove } from '../framework/render.js';
import { filterPoints, sortPoints } from '../utils.js';
import TripPointPresenter from './trip-point-presenter.js';
import { BlockerTimeLimits, DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE, EmptyListMessages, InfoMessages, ModeTypes, UpdateTypes, UserActions } from '../const.js';
import InfoMessage from '../view/info-message.js';
import NewEventButton from '../view/new-event-button.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class BodyPresenter {
  #listComponent = null;
  #mainElement = document.querySelector('.trip-main');
  #listContainer = null;
  #tripsModel = null;
  #filterModel = null;
  #tripPointPresenters = new Map();
  #currentSortType = DEFAULT_SORT_TYPE;
  #sortViewComponent = null;
  #infoMessageComponent = null;
  #newEventButtonComponent = null;
  #isLoading = true;
  #loadingComponent = null;
  #errorMeassageComponent = null;
  #uiBlocker = null;
  #newPointPresenter = null;

  constructor({ container, tripsModel, filterModel }) {
    this.#listContainer = container;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
    this.#tripsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
    this.#uiBlocker = new UiBlocker({
      lowerLimit: BlockerTimeLimits.LOWER_LIMIT,
      upperLimit: BlockerTimeLimits.UPPER_LIMIT
    });
  }

  init() {
    this.#renderNewEventButton();
    if (this.#isLoading) {
      remove(this.#errorMeassageComponent);
      this.#loadingComponent = new InfoMessage({message: InfoMessages.LOADING});
      render(this.#loadingComponent, this.#listContainer);
    } else {
      this.#renderPageMain();
    }

  }

  #renderPageMain() {
    const filteredPoints = filterPoints(this.#filterModel.filter, this.#tripsModel.tripPoints);

    if (filteredPoints.length === 0) {
      remove(this.#sortViewComponent);
      this.#sortViewComponent = null;
      this.#renderEmptyPointsList();
    } else {
      this.#renderPointsList(filteredPoints);
    }
  }

  #renderPointsList(filteredPoints) {
    this.#renderSort();
    if (!this.#listComponent) {
      this.#listComponent = new TripList();
    }
    render(this.#listComponent, this.#listContainer);
    remove(this.#infoMessageComponent);
    this.#infoMessageComponent = null;
    if (filteredPoints) {
      this.#renderTripPoints(filteredPoints);
    }
  }

  #renderNewEventButton() {
    if (this.#newEventButtonComponent === null) {
      this.#newEventButtonComponent = new NewEventButton({ onClick: this.#handleNewEventButtonClick });
      render(this.#newEventButtonComponent, this.#mainElement);
    }
  }

  #renderEmptyPointsList() {
    if (!this.#infoMessageComponent) {
      this.#infoMessageComponent = new InfoMessage({message: EmptyListMessages[this.#filterModel.filter.toUpperCase()]});
      render(this.#infoMessageComponent, this.#listContainer);
    }

  }

  #renderTripPoints(filteredPoints) {
    sortPoints(this.#currentSortType, filteredPoints);
    filteredPoints.forEach((point) => {
      const content = this.#tripsModel.getContentById(point.id);
      const pointPresenter = new TripPointPresenter({
        container: this.#listComponent.element,
        destinations: this.#tripsModel.destinations,
        offers: this.#tripsModel.offers,
        onDataChange: this.#handleTripPointChange,
        onModeChange: this.#handleModeChange,
        mode: ModeTypes.DEFAULT
      });
      pointPresenter.init(content);
      this.#tripPointPresenters.set(content.point.id, pointPresenter);
    });
  }

  #clearTripPoints() {
    this.#tripPointPresenters.forEach((tripPoint) => tripPoint.destroy());
    this.#tripPointPresenters.clear();
  }

  #handleTripPointChange = async (actionType, updateType, newPoint) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserActions.ADD_EVENT:
        this.#newPointPresenter.setSavingMode();
        try {
          await this.#tripsModel.addPoint(updateType, newPoint);
          this.#newPointPresenter.destroy();
          this.#newEventButtonComponent.updateElement({ isDisabled: false });
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserActions.UPDATE_EVENT:
        this.#tripPointPresenters.get(newPoint.id).setSavingMode();
        try {
          await this.#tripsModel.updatePoint(updateType, newPoint);
        } catch(err) {
          this.#tripPointPresenters.get(newPoint.id).setAborting();
        }
        break;
      case UserActions.DELETE_EVENT:
        this.#tripPointPresenters.get(newPoint.id).setDeletingMode();
        try {
          await this.#tripsModel.deletePoint(updateType, newPoint);
        } catch(err) {
          this.#tripPointPresenters.get(newPoint.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelChange = (updateType, id) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#tripPointPresenters.get(id).init(this.#tripsModel.getContentById(id));
        break;
      case UpdateTypes.MINOR:
        this.#clearTripPoints();
        this.#renderPageMain();
        break;
      case UpdateTypes.MAJOR:
        this.#clearTripPoints();
        this.#currentSortType = DEFAULT_SORT_TYPE;
        this.init();
        break;
      case UpdateTypes.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.init();
        break;
      case UpdateTypes.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#sortViewComponent);
        this.#clearTripPoints();
        this.#renderErrorMessage();
        break;
    }
  };

  #renderErrorMessage() {
    this.#errorMeassageComponent = new InfoMessage({message: InfoMessages.ERROR});
    render(this.#errorMeassageComponent, this.#listContainer);
  }

  #renderSort = () => {
    const previousSortViewComponent = this.#sortViewComponent;
    const newSortViewComponent = new SortForm({
      onSortChange: this.#handleSortChange,
      currentSortType: this.#currentSortType
    });

    if (previousSortViewComponent === null) {
      render(newSortViewComponent, this.#listContainer);
    } else {
      replace(newSortViewComponent, previousSortViewComponent);
      remove(previousSortViewComponent);
    }

    this.#sortViewComponent = newSortViewComponent;
  };

  #handleModeChange = (id) => {
    if (this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
    }

    this.#tripPointPresenters.forEach((tripPoint, index) => {
      if (index !== id) {
        tripPoint.resetView();
      }
    });
  };

  #handleSortChange = (name) => {
    if (this.#currentSortType !== name) {
      this.#currentSortType = name;
      this.#clearTripPoints();
      this.#renderPageMain();
    }
  };

  #handleNewEventButtonClick = () => {
    this.#newEventButtonComponent.updateElement({ isDisabled: true });
    if (this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
    }
    this.#currentSortType = DEFAULT_SORT_TYPE;
    this.#filterModel.setFilter(UpdateTypes.MINOR, DEFAULT_FILTER_TYPE);
    if (!this.#listComponent) {
      this.#renderPointsList();
    }
    this.#newPointPresenter = new TripPointPresenter({
      container: this.#listComponent.element,
      destinations: this.#tripsModel.destinations,
      offers: this.#tripsModel.offers,
      onDataChange: this.#handleTripPointChange,
      onModeChange: this.#handleModeChange,
      onCancelButtonClick: this.#handleCancelButtonClick,
      mode: ModeTypes.NEW
    });
    this.#newPointPresenter.init();
  };

  #handleCancelButtonClick = () => {
    this.#newEventButtonComponent.updateElement({ isDisabled: false });
    const filteredPoints = filterPoints(this.#filterModel.filter, this.#tripsModel.tripPoints);
    if (filteredPoints.length === 0) {
      this.#renderPageMain();
    }
  };
}
