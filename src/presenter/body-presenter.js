
import TripList from '../view/trip-list.js';
import SortForm from '../view/sort-form.js';
import FilterForm from '../view/filter-form.js';
import TotalCost from '../view/total-cost.js';
import TripTitle from '../view/trip-title.js';
import TripInfo from '../view/trip-info.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { filterPoints, sortPoints, updateItem } from '../utils.js';
import TripPointPresenter from './trip-point-presenter.js';
import { DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE, EmptyListMessages, FilterTypes } from '../const.js';
import EmptyTripList from '../view/empty-trip-list.js';

export default class BodyPresenter {
  #listComponent = new TripList();
  #tripInfoContainer = new TripInfo();
  #mainElement = document.querySelector('.trip-main');
  #filterContainer = document.querySelector('.trip-controls__filters');
  #listContainer = null;
  #tripsModel = null;
  #tripsPoints = null;
  #tripPointPresenters = new Map();
  #originalTripsList = null;
  #currentSortType = DEFAULT_SORT_TYPE;
  #currentSortView = null;
  #currentFilterType = DEFAULT_FILTER_TYPE;

  constructor({ container, tripsModel }) {
    this.#listContainer = container;
    this.#tripsModel = tripsModel;
    this.#tripsPoints = [...this.#tripsModel.tripPoints];
    sortPoints(DEFAULT_SORT_TYPE, this.#tripsPoints);
    this.#originalTripsList = [...this.#tripsPoints];
  }

  init() {
    this.#renderBody();
  }

  #renderBody() {
    this.#renderTripInfo();
    this.#renderFilters();
    if (this.#tripsPoints.length) {
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
    render(new EmptyTripList({message: EmptyListMessages[this.#currentFilterType.toUpperCase()]}), this.#listContainer);
  }

  #renderTripPoints() {
    for (let i = 0; i < this.#tripsPoints.length; i++) {
      const content = {
        point: this.#tripsPoints[i],
        destination: this.#tripsModel.getDestinations(this.#tripsPoints[i].destination),
        offers: this.#tripsModel.getOffers(this.#tripsPoints[i].type)
      };
      const pointPresenter = new TripPointPresenter({
        container: this.#listComponent.element,
        destinations: this.#tripsModel.getDestinations(),
        offers: this.#tripsModel.getOffers(),
        onDataChange: this.#handleTripPointChange,
        onModeChange: this.#handleEditMode
      });
      pointPresenter.init(content);
      this.#tripPointPresenters.set(content.point.id, pointPresenter);
    }
  }

  #clearTripPoints() {
    this.#tripPointPresenters.forEach((tripPoint) => tripPoint.destroy());
    this.#tripPointPresenters.clear();
  }

  #handleTripPointChange = (newContent) => {
    const tripPoint = this.#tripPointPresenters.get(newContent.point.id);
    this.#tripsPoints = updateItem(this.#tripsPoints, newContent.point);
    tripPoint.init(newContent);
  };

  #renderSort() {
    this.#currentSortView = new SortForm({onSortChange: this.#handleSortChange});
    render(this.#currentSortView, this.#listContainer);
  }

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

  #handleFilterChange = (name) => {
    if (name !== this.#currentFilterType) {
      this.#clearTripPoints();
      this.#currentFilterType = name;
      this.#tripsPoints = filterPoints(name, this.#originalTripsList);
      if (this.#currentSortType !== DEFAULT_SORT_TYPE) {
        this.#updateSort();
      }
      this.#renderTripPoints();
    }

  };
}
