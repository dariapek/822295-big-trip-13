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
import {getFilterData} from './mock/filters-mock';
import {getNavigationData} from './mock/navigation-mock';

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
const filtersData = getFilterData();
const navigationsData = getNavigationData();

render(tripInfo, getTotalPriceTemplate(), `beforeend`);
render(controls, getNavigation(navigationsData), `afterbegin`);
render(controls, getFiltersList(filtersData), `beforeend`);
render(tripEvents, getSortListTemplate(sortData), `beforeend`);
render(tripEvents, getPointsListTemplate(), `beforeend`);

const eventsList = tripEvents.querySelector(`.trip-events__list`);

const firstTripPointIndex = 0;
render(eventsList, getEditTemplate(), `beforeend`);
render(eventsList, getEditTemplate(tripPoints[firstTripPointIndex]), `beforeend`);

for (let i = firstTripPointIndex + 1; i < EVENT_COUNT; i++) {
  render(eventsList, getPointTemplate(tripPoints[i]), `beforeend`);
}


