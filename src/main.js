import BodyPresenter from './presenter/body-presenter.js';
import TripsModel from './model/trip-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import BigTripApiService from './big-trip-api-service.js';
import { AUTHORIZATION_STRING, BASE_URL } from './const.js';


const tripContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const bigTripApiService = new BigTripApiService(BASE_URL, AUTHORIZATION_STRING);
const tripsModel = new TripsModel({ apiService: bigTripApiService });
const filterModel = new FilterModel();


const bodyPresenter = new BodyPresenter({'container': tripContainer, tripsModel, filterModel });
const filterPresenter = new FilterPresenter({'container': filterContainer, filterModel, tripsModel });

tripsModel.init();
bodyPresenter.init();
filterPresenter.init();
