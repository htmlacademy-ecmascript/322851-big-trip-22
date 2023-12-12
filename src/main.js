import BodyPresenter from './presenter/body-presenter.js';

const tripContainer = document.querySelector('.trip-events');

const presenter = new BodyPresenter({'container': tripContainer});

presenter.init();
