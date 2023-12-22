import AbstractView from '../framework/view/abstract-view.js';

const createTotalCostTemplate = () => (`<p class="trip-info__cost">
Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
</p>`);


export default class TotalCost extends AbstractView {

  get template() {
    return createTotalCostTemplate();
  }
}
