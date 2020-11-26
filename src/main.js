import {getInformationTemplate} from './view/information';
import {getTotalPriceTemplate} from './view/total-price';
import {getNavigation} from './view/navigation';
import {getFiltersList} from './view/filters';
import {getSortListTemplate} from './view/sort-list';
import {getPointsListTemplate} from './view/points-list';
import {getEditTemplate} from './view/edit-form';
import {getPointTemplate} from './view/point';

import {generateTripPoint} from './mock/trip-point-mock';
import {getSortData} from './mock/sort-mock';

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
const sortData = getSortData();

render(tripInfo, getTotalPriceTemplate(), `beforeend`);
render(controls, getNavigation(), `afterbegin`);
render(controls, getFiltersList(), `beforeend`);
render(tripEvents, getSortListTemplate(sortData), `beforeend`);
render(tripEvents, getPointsListTemplate(), `beforeend`);

const eventsList = tripEvents.querySelector(`.trip-events__list`);

const firstTripPoint = 0;
render(eventsList, getEditTemplate(), `beforeend`);
render(eventsList, getEditTemplate(tripPoints[firstTripPoint]), `beforeend`);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(eventsList, getPointTemplate(tripPoints[i]), `beforeend`);
}


