
import AbstractView from '../framework/view/abstract-view.js';


const isFilterDisable = (count) => (count) ? '' : 'disabled';

const createFilterList = (filters) => filters.map(({name, count}) => `<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isFilterDisable(count)}>
  <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
</div>
`).join('');

const createFilterFormTemplate = (filters) => (`<form class="trip-filters" action="#" method="get">
${createFilterList(filters)}
<button class="visually-hidden" type="submit">Accept filter</button>
</form>`);


export default class FilterForm extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterFormTemplate(this.#filters);
  }
}
