import BodyPresenter from './presenter/body-presenter.js';
import TripsModel from './model/trip-model.js';


const tripContainer = document.querySelector('.trip-events');
const tripsModel = new TripsModel();

const presenter = new BodyPresenter({'container': tripContainer, tripsModel });

presenter.init();
