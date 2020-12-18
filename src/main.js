import InformationView from "./view/information";
import TotalPriceView from "./view/total-price";
import NavigationView from "./view/navigation";
import FiltersView from "./view/filters";
import TripPresenter from "./presenter/trip";

import {generateTripPoint} from "./mock/trip-point-mock";
import {getFilterData} from "./mock/filters-mock";
import {getNavigationData} from "./mock/navigation-mock";
import {render, RenderPosition} from "./utils/render";

const EVENT_COUNT = 15;

const body = document.querySelector(`.page-body`);
const main = body.querySelector(`.trip-main`);
const controls = main.querySelector(`.trip-controls`);
const tripEvents = body.querySelector(`.trip-events`);

const tripPoints = new Array(EVENT_COUNT).fill().map(generateTripPoint);

render(main, new InformationView(), RenderPosition.AFTER_BEGIN);

const tripInfo = body.querySelector(`.trip-info`);
const filtersData = getFilterData();
const navigationsData = getNavigationData();

render(tripInfo, new TotalPriceView(), RenderPosition.BEFORE_END);
render(controls, new NavigationView(navigationsData), RenderPosition.AFTER_BEGIN);
render(controls, new FiltersView(filtersData), RenderPosition.BEFORE_END);


const tripPresenter = new TripPresenter(tripEvents);
tripPresenter.init(tripPoints);

