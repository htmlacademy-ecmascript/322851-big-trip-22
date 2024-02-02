import AbstractView from '../framework/view/abstract-view.js';

const isFilterDisable = (count) => (count) ? '' : 'disabled';
const isFilterChecked = (status) => (status) ? 'checked' : '';

const createFilterList = (filters) => filters.map(({name, count, isChecked}) => `<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" data-filter-type="${name}" value="${name}" ${isFilterDisable(count)}  ${isFilterChecked(isChecked)}>
  <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
</div>
`).join('');

const createFilterFormTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">
  ${createFilterList(filters)}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);


export default class FilterForm extends AbstractView {
  #filters = null;
  #handleFilterChange = null;

  constructor({ filters, onFilterChange }) {
    super();
    this.#filters = filters;
    this.#handleFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#filterInputChangeHandler);
  }

  get template() {
    return createFilterFormTemplate(this.#filters);
  }

  #filterInputChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.#handleFilterChange(evt.target.dataset.filterType);
    }
  };
}
