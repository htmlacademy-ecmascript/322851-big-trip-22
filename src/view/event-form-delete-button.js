import AbstractView from '../framework/view/abstract-view';

const createDeleteButtonTemplate = () => '<button class="event__reset-btn" type="reset">Delete</button>';

export default class EventFormDeleteButton extends AbstractView {

  get template() {
    return createDeleteButtonTemplate();
  }
}
