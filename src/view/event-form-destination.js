import { createElement } from '../render.js';

const renderPictures = (pictures) => pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('');

const createEventFormDestinationTemplate = (destination) => {
  if (!destination) {
    return '';
  }
  return `<section class="event__section  event__section--destination">
<h3 class="event__section-title  event__section-title--destination">Destination</h3>
<p class="event__destination-description">${destination.description}</p>

<div class="event__photos-container">
  <div class="event__photos-tape">
    ${renderPictures(destination.pictures)}
  </div>
</div>
</section>`;
}



export default class EventFormDestination {
  constructor({ content }) {
    this.content = content;
  }

  getTemplate() {
    return createEventFormDestinationTemplate(this.content);
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
