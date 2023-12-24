
import TripList from '../view/trip-list.js';
import SortForm from '../view/sort-form.js';
import FilterForm from '../view/filter-form.js';
import TotalCost from '../view/total-cost.js';
import TripTitle from '../view/trip-title.js';
import TripInfo from '../view/trip-info.js';
import { render, RenderPosition } from '../framework/render.js';
import { filters, updateItem } from '../utils.js';
import TripPointPresenter from './trip-point-presenter.js';

export default class BodyPresenter {
  #listComponent = new TripList();
  #tripInfoContainer = new TripInfo();
  #mainElement = document.querySelector('.trip-main');
  #filterContainer = document.querySelector('.trip-controls__filters');
  #listContainer = null;
  #tripsModel = null;
  #tripsPoints = null;
  #tripPointPresenters = new Map();

  constructor({ container, tripsModel }) {
    this.#listContainer = container;
    this.#tripsModel = tripsModel;
    this.#tripsPoints = [...this.#tripsModel.tripPoints];
  }

  init() {
    this.#renderBody();
  }

  #renderBody() {
    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderSort();
    render(this.#listComponent, this.#listContainer);
    this.#renderTripPoints();
  }

  #renderTripInfo() {
    render(this.#tripInfoContainer, this.#mainElement, RenderPosition.AFTERBEGIN);
    render(new TripTitle(), this.#tripInfoContainer.element);
    render(new TotalCost(), this.#tripInfoContainer.element);
  }

  #renderTripPoints() {
    for (let i = 0; i < this.#tripsPoints.length; i++) {
      const content = {
        point: this.#tripsPoints[i],
        destination: this.#tripsModel.getDestinations(this.#tripsPoints[i].destination),
        offers: this.#tripsModel.getOffers(this.#tripsPoints[i].type)
      };
      const pointPresenter = new TripPointPresenter({container: this.#listComponent.element, destinations: this.#tripsModel.getDestinations(), offers: this.#tripsModel.getOffers(), onDataChange: this.#handleTripPointChange, onModeChange: this.#handleEditMode});
      pointPresenter.init(content);
      this.#tripPointPresenters.set(content.point.id, pointPresenter);
    }
  }

  #clearTripPoints() {
    this.#tripPointPresenters.forEach(([, tripPoint]) => tripPoint.destroy());
    this.#tripPointPresenters.clear();
  }

  #handleTripPointChange = (newContent) => {
    const tripPoint = this.#tripPointPresenters.get(newContent.point.id);
    this.#tripsPoints = updateItem(this.#tripsPoints, newContent.point);
    tripPoint.init(newContent);
  };

  #renderSort() {
    render(new SortForm(), this.#listContainer);
  }

  #renderFilters() {
    const generatedFilters = Object.entries(filters).map(([ filterName, cb ], index) => ({name: filterName, count: cb(this.#tripsPoints).length, isChecked: index === 0}));
    render(new FilterForm({'filters': generatedFilters }), this.#filterContainer);
  }

  #handleEditMode = (id) => {
    this.#tripPointPresenters.forEach((tripPoint, index) => {
      if (index !== id) {
        tripPoint.resetView();
      }
    });
  };
}
