import { SortingType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


const renderSortItem = (name, isDisabled, currentSortType) => {
  isDisabled = (isDisabled) ? 'disabled' : '';
  const isChecked = (currentSortType === name) ? 'checked' : '';
  return `<div class="trip-sort__item  trip-sort__item--${name}">
  <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type='${name}' value="sort-${name}" ${isDisabled} ${isChecked} >
  <label class="trip-sort__btn" for="sort-${name}">${name}</label>
</div>`;
};

const renderSortList = (currentSortType) => {
  const sortTypes = Object.values(SortingType);
  return sortTypes.map(({name, isDisabled}) => renderSortItem(name, isDisabled, currentSortType)).join('');
};

const createSortFormTemplate = (currentSortType) => (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${renderSortList(currentSortType)}

</form>`);


export default class SortForm extends AbstractView {
  #currentSortType = null;
  #handleSortChange = null;

  constructor({ onSortChange, currentSortType }) {
    super();
    this.#handleSortChange = onSortChange;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('change', this.#sortInputChangeHandler);
  }

  get template() {
    return createSortFormTemplate(this.#currentSortType);
  }

  #sortInputChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.#handleSortChange(evt.target.dataset.sortType);
    }
  };


}
