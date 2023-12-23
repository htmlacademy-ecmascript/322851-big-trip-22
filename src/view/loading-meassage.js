import AbstractView from '../framework/view/abstract-view';

const createLoadinMessageTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class LoadingMessage extends AbstractView {

  get template() {
    return createLoadinMessageTemplate();
  }
}
