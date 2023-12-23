import AbstractView from '../framework/view/abstract-view';

const createFailedLoadMessageTemplate = () => '<p class="trip-events__msg">Failed to load latest route information</p>';

export default class FailedLoadMessage extends AbstractView {

  get template() {
    return createFailedLoadMessageTemplate();
  }
}
