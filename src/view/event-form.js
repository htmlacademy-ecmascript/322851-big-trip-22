import AbstractView from '../framework/view/abstract-view.js';

const createEventFormTemplate = () => (`<li class="trip-events__item">
<form class="event event--edit" action="#" method="post"></form></li>`);


export default class EventForm extends AbstractView {
  #element = null;

  get template() {
    return createEventFormTemplate();
  }
}
