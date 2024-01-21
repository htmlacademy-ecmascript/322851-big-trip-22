import BodyPresenter from './presenter/body-presenter.js';
import TripsModel from './model/trips-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import BigTripApiService from './big-trip-api-service.js';
import { AUTHORIZATION_STRING, BASE_URL } from './const.js';
import HeaderPresenter from './presenter/header-presenter.js';


const tripContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const headerContainer = document.querySelector('.trip-main');

const bigTripApiService = new BigTripApiService(BASE_URL, AUTHORIZATION_STRING);
const tripsModel = new TripsModel({ apiService: bigTripApiService });
const filterModel = new FilterModel();


const headerPresenter = new HeaderPresenter({ headerContainer, tripsModel });
const bodyPresenter = new BodyPresenter({'container': tripContainer, tripsModel, filterModel });
const filterPresenter = new FilterPresenter({'container': filterContainer, filterModel, tripsModel });

tripsModel.init();
bodyPresenter.init();
filterPresenter.init();
