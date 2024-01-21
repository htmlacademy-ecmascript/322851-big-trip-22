import { DATE_FORMAT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { parseDate } from '../utils.js';

const renderDestinations = ({ firstDestination, secondDestination, lastDestination, destinationsCount }) => {
  switch (destinationsCount) {
    case 1:
      lastDestination = '';
      secondDestination = '';
      break;
    case 2:
      secondDestination = '-';
      break;
    case 3:
      secondDestination = `- ${secondDestination} -`;
      break;
    default:
      secondDestination = '- ... -';
      break;
  }
  return `${firstDestination} ${secondDestination} ${lastDestination}`;
};

const renderDates = ({firstDate, secondDate}) => {
  const dateFormat = DATE_FORMAT.split(' ').reverse().join(' ');
  const [firstDay, firstMonth] = parseDate(firstDate, dateFormat).split(' ');
  const [secondDay, secondMonth] = parseDate(secondDate, dateFormat).split(' ');

  /*if (firstMonth === secondMonth) {
    return `${firstDay} - ${secondDay} ${secondMonth}`;
  }*/
  return `${firstDay} ${firstMonth} - ${secondDay} ${secondMonth}`;
};


const createTripTitleTemplate = (destinations, dates) => (`<div class="trip-info__main">
<h1 class="trip-info__title">${renderDestinations(destinations)}</h1>

<p class="trip-info__dates">${renderDates(dates)}</p>
</div>`);


export default class TripTitle extends AbstractView {
  #destinations = null;
  #dates = null;

  constructor(destinations, dates) {
    super();
    this.#destinations = destinations;
    this.#dates = dates;
  }

  get template() {
    return createTripTitleTemplate(this.#destinations, this.#dates);
  }
}
