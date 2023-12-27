import { SortingTypes } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


const renderSortItem = (name, isDisabled, defaultSortType) => {
  isDisabled = (isDisabled) ? 'disabled' : '';
  const isChecked = (defaultSortType === name) ? 'checked' : '';
  return `<div class="trip-sort__item  trip-sort__item--${name}">
  <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type='${name}' value="sort-${name}" ${isDisabled} ${isChecked} >
  <label class="trip-sort__btn" for="sort-${name}">${name}</label>
</div>`;
};

const renderSortList = (defaultSortType) => {
  const sortTypes = Object.values(SortingTypes);
  return sortTypes.map(({name, isDisabled}) => renderSortItem(name, isDisabled, defaultSortType)).join('');
};

const createSortFormTemplate = (defaultSortType) => (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${renderSortList(defaultSortType)}

</form>`);


export default class SortForm extends AbstractView {
  #defaultSortType = SortingTypes.DAY.name;
  #handleSortChange = null;

  constructor({ onChange }) {
    super();
    this.#handleSortChange = onChange;
    this.element.addEventListener('change', this.#changeSortOrder);
  }

  get template() {
    return createSortFormTemplate(this.#defaultSortType);
  }

  #changeSortOrder = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.#handleSortChange(evt.target.dataset.sortType);
    }
  };


}
