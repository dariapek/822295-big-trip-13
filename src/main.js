import {getInformationTemplate} from './view/information';
import {getTotalPriceTemplate} from './view/total-price';
import {getNavigation} from './view/navigation';
import {getFiltersList} from './view/filters';
import {getSortListTemplate} from './view/sort-list';
import {getPointsListTemplate} from './view/points-list';
import {getCreateFormTemplate} from './view/create-form';
import {getEditTemplate} from './view/edit-form';
import {getPointTemplate} from './view/point';

import {generateTripPoint} from './mock/trip-point';

const EVENT_COUNT = 15;

const body = document.querySelector(`.page-body`);
const main = body.querySelector(`.trip-main`);
const controls = main.querySelector(`.trip-controls`);
const tripEvents = body.querySelector(`.trip-events`);

const tripPoints = new Array(EVENT_COUNT).fill().map(generateTripPoint);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(main, getInformationTemplate(), `afterbegin`);

const tripInfo = body.querySelector(`.trip-info`);

render(tripInfo, getTotalPriceTemplate(), `beforeend`);
render(controls, getNavigation(), `afterbegin`);
render(controls, getFiltersList(), `beforeend`);
render(tripEvents, getSortListTemplate(), `beforeend`);
render(tripEvents, getPointsListTemplate(), `beforeend`);

const eventsList = tripEvents.querySelector(`.trip-events__list`);

render(eventsList, getCreateFormTemplate(), `beforeend`);
render(eventsList, getEditTemplate(), `beforeend`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventsList, getPointTemplate(tripPoints[i]), `beforeend`);
}


