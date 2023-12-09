import { createElement } from '../render.js';

const createTotalCostTemplate = () => (`<p class="trip-info__cost">
Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
</p>`);


export default class TotalCost {
  getTemplate() {
    return createTotalCostTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
