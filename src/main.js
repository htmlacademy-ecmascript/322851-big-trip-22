import BodyPresenter from './presenter/body-presenter.js';
import TripsModel from './model/trip-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';


const tripContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripsModel = new TripsModel();
const filterModel = new FilterModel();

const bodyPresenter = new BodyPresenter({'container': tripContainer, tripsModel });
const filterPresenter = new FilterPresenter({'container': filterContainer, filterModel, tripsModel });


bodyPresenter.init();
filterPresenter.init();
