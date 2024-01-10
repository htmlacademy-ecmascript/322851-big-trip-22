import TripList from '../view/trip-list.js';
import SortForm from '../view/sort-form.js';
import TotalCost from '../view/total-cost.js';
import TripTitle from '../view/trip-title.js';
import TripInfo from '../view/trip-info.js';
import { render, RenderPosition, replace, remove } from '../framework/render.js';
import { filterPoints, sortPoints } from '../utils.js';
import TripPointPresenter from './trip-point-presenter.js';
import { DEFAULT_SORT_TYPE, EmptyListMessages, UpdateTypes, UserActions } from '../const.js';
import InfoMessage from '../view/info-message.js';

export default class BodyPresenter {
  #listComponent = new TripList();
  #tripInfoComponent = null;
  #mainElement = document.querySelector('.trip-main');
  #listContainer = null;
  #tripsModel = null;
  #filterModel = null;
  #tripsPoints = null;
  #tripPointPresenters = new Map();
  #currentSortType = DEFAULT_SORT_TYPE;
  #sortViewComponent = null;

  constructor({ container, tripsModel, filterModel }) {
    this.#listContainer = container;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
    this.#tripsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#renderTripInfo();
    if (this.#tripsModel.tripPoints.length > 0) {
      this.#renderSort();
      render(this.#listComponent, this.#listContainer);
      this.#renderTripPoints();
    } else {
      this.#renderEmptyPointsList();
    }
  }

  #renderTripInfo() {
    const previousTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfo();
    if (previousTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#mainElement, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#tripInfoComponent, previousTripInfoComponent);
      remove(previousTripInfoComponent);
    }
    render(new TripTitle(), this.#tripInfoComponent.element);
    render(new TotalCost(), this.#tripInfoComponent.element);
  }

  #renderEmptyPointsList() {
    render(new InfoMessage({message: EmptyListMessages[this.#filterModel.filter.toUpperCase()]}), this.#listContainer);
  }

  #renderTripPoints() {
    const filteredPoints = filterPoints(this.#filterModel.filter, this.#tripsModel.tripPoints);
    sortPoints(this.#currentSortType, filteredPoints);
    filteredPoints.forEach((point) => {
      const content = this.#tripsModel.getContentById(point.id);
      const pointPresenter = new TripPointPresenter({
        container: this.#listComponent.element,
        destinations: this.#tripsModel.destinations,
        offers: this.#tripsModel.offers,
        onDataChange: this.#handleTripPointChange,
        onModeChange: this.#handleEditMode
      });
      pointPresenter.init(content);
      this.#tripPointPresenters.set(content.point.id, pointPresenter);
    });
  }

  #clearTripPoints() {
    this.#tripPointPresenters.forEach((tripPoint) => tripPoint.destroy());
    this.#tripPointPresenters.clear();
  }

  #handleTripPointChange = (actionType, updateType, newPoint) => {
    switch (actionType) {
      case UserActions.ADD_EVENT:
        this.#tripsModel.addPoint(updateType, newPoint);
        break;
      case UserActions.UPDATE_EVENT:
        this.#tripsModel.updatePoint(updateType, newPoint);
        break;
      case UserActions.DELETE_EVENT:
        this.#tripsModel.deletePoint(updateType, newPoint);
        break;
    }
  };

  #handleModelChange = (updateType, id) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#tripPointPresenters.get(id).init(this.#tripsModel.getContentById(id));
        break;
      case UpdateTypes.MINOR:
        this.#clearTripPoints();
        this.#renderTripPoints();
        break;
      case UpdateTypes.MAJOR:
        this.#clearTripPoints();
        this.#currentSortType = DEFAULT_SORT_TYPE;
        this.init();
        break;
    }
  };

  #renderSort = () => {
    const previousSortViewComponent = this.#sortViewComponent;
    const newSortViewComponent = new SortForm({onSortChange: this.#handleSortChange});

    if (previousSortViewComponent === null) {
      render(newSortViewComponent, this.#listContainer);
    } else {
      replace(newSortViewComponent, previousSortViewComponent);
      remove(previousSortViewComponent);
    }

    this.#sortViewComponent = newSortViewComponent;
  };

  #handleEditMode = (id) => {
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
      this.#renderTripPoints();
    }
  };
}
