import { remove, replace, render } from '../framework/render.js';
import { filterPoints } from '../utils.js';
import FilterForm from '../view/filter-form.js';
import { FilterTypes, UpdateTypes } from '../const.js';

export default class FilterPresenter {
  #container = null;
  #tripsModel = null;
  #filterModel = null;
  #filterComponent = null;

  constructor({ container, filterModel, tripsModel }) {
    this.#container = container;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;

    this.#tripsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  get filters() {
    return Object.values(FilterTypes).map((name) => ({
      name: name,
      count: filterPoints(name, this.#tripsModel.tripPoints).length,
      isChecked: name === this.#filterModel.filter
    }));
  }

  init() {
    const previousFilterComponent = this.#filterComponent;

    const newFilterComponent = new FilterForm({'filters': this.filters , onFilterChange: this.#handleFilterChange});

    if (previousFilterComponent === null) {
      render(newFilterComponent, this.#container);
    } else {
      replace(newFilterComponent, previousFilterComponent);
      remove(previousFilterComponent);
    }

    this.#filterComponent = newFilterComponent;
  }

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter !== filterType) {
      this.#filterModel.setFilter(UpdateTypes.MAJOR, filterType);
    }
  };

  #handleModelChange = () => {
    this.init();
  };

}
