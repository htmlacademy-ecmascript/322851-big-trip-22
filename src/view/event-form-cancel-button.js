import AbstractView from '../framework/view/abstract-view';

const createCancelButtonTemplate = () => '<button class="event__reset-btn" type="reset">Cancel</button>';

export default class EventFormCancelButton extends AbstractView {

  get template() {
    return createCancelButtonTemplate();
  }
}
