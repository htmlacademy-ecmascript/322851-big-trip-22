import TripList from '../view/trip-list.js';
import SortForm from '../view/sort-form.js';
import FilterForm from '../view/filter-form.js';
import TotalCost from '../view/total-cost.js';
import TripTitle from '../view/trip-title.js';
import TripInfo from '../view/trip-info.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { filterPoints, sortPoints } from '../utils.js';
import TripPointPresenter from './trip-point-presenter.js';
import { DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE, EmptyListMessages, FilterTypes, UpdateTypes, UserActions } from '../const.js';
import InfoMessage from '../view/info-message.js';
import FilterModel from '../model/filter-model.js';

export default class BodyPresenter {
  #listComponent = new TripList();
  #tripInfoContainer = new TripInfo();
  #mainElement = document.querySelector('.trip-main');
  #listContainer = null;
  #tripsModel = null;
  #filterModel = null;
  #tripsPoints = null;
  #tripPointPresenters = new Map();
  #originalTripsList = null;
  #currentSortType = DEFAULT_SORT_TYPE;
  #currentSortView = null;
  #currentFilterType = DEFAULT_FILTER_TYPE;

  constructor({ container, tripsModel }) {
    this.#listContainer = container;
    this.#tripsModel = tripsModel;
    this.#filterModel = new FilterModel();
    this.#tripsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);

  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();
    if (this.#tripsModel.tripPoints.length > 0) {
      this.#renderSort();
      render(this.#listComponent, this.#listContainer);
      this.#renderTripPoints();
    } else {
      this.#renderEmptyPointsList();
    }
  }

  #renderTripInfo() {
    render(this.#tripInfoContainer, this.#mainElement, RenderPosition.AFTERBEGIN);
    render(new TripTitle(), this.#tripInfoContainer.element);
    render(new TotalCost(), this.#tripInfoContainer.element);
  }

  #renderEmptyPointsList() {
    render(new InfoMessage({message: EmptyListMessages[this.#currentFilterType.toUpperCase()]}), this.#listContainer);
  }

  #renderTripPoints() {
    const filteredPoints = filterPoints(this.#currentFilterType, this.#tripsModel.tripPoints);
    filteredPoints.sortPoints(this.#currentSortType, filteredPoints);
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

  #handleTripPointChange = (actionType, updateType, newContent) => {
    switch (actionType) {
      case UserActions.ADD_EVENT:
        this.#tripsModel.addPoint(newContent.point);
        break;
      case UserActions.UPDATE_EVENT:
        this.#tripsModel.updatePoint(newContent.point);
        break;
      case UserActions.DELETE_EVENT:
        this.#tripsModel.deletePoint(newContent.point);
        break;
    }

  };

  #handleModelChange = (updateType, content) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#tripPointPresenters.get(content.point.id).init(content);
        break;
      case UpdateTypes.MINOR:
        this.#clearTripPoints();
        this.#renderTripPoints();
        break;
      case UpdateTypes.MAJOR:
        this.init();
        break;
    }
  };

  #renderSort = () => {
    this.#currentSortView = new SortForm({onSortChange: this.#handleSortChange});
    render(this.#currentSortView, this.#listContainer);
  };

  #updateSort() {
    const newSortView = new SortForm({onSortChange: this.#handleSortChange});
    replace(newSortView, this.#currentSortView);
    this.#currentSortView = newSortView;
    this.#currentSortType = DEFAULT_SORT_TYPE;
  }

  #renderFilters() {
    const generatedFilters = Object.values(FilterTypes).map((name) => ({
      name: name,
      count: filterPoints(name, this.#tripsPoints).length,
      isChecked: name === DEFAULT_FILTER_TYPE
    }));
    render(new FilterForm({'filters': generatedFilters , onFilterChange: this.#handleFilterChange}), this.#filterContainer);
  }

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
      sortPoints(name, this.#tripsPoints);
      this.#renderTripPoints();
    }
  };
}
