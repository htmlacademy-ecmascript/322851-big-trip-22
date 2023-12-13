import { createElement } from '../render.js';

const createTripTitleTemplate = () => (`<div class="trip-info__main">
<h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

<p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
</div>`);


export default class TripTitle {
  getTemplate() {
    return createTripTitleTemplate();
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
