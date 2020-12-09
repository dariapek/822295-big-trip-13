import InformationView from "./view/information";
import TotalPriceView from "./view/total-price";
import NavigationView from "./view/navigation";
import FiltersView from "./view/filters";
import SortView from "./view/sort";
import PointsListView from "./view/points-list";
import EditPointView from "./view/edit-form";
import PointView from "./view/point";

import {generateTripPoint} from "./mock/trip-point-mock";
import {getSortData} from "./mock/sort-mock";
import {getFilterData} from "./mock/filters-mock";
import {getNavigationData} from "./mock/navigation-mock";
import {render, RenderPosition, replace} from "./utils/render";

const EVENT_COUNT = 15;

const body = document.querySelector(`.page-body`);
const main = body.querySelector(`.trip-main`);
const controls = main.querySelector(`.trip-controls`);
const tripEvents = body.querySelector(`.trip-events`);

const tripPoints = new Array(EVENT_COUNT).fill().map(generateTripPoint);

render(main, new InformationView(), RenderPosition.AFTER_BEGIN);

const tripInfo = body.querySelector(`.trip-info`);
const sortData = getSortData();
const filtersData = getFilterData();
const navigationsData = getNavigationData();

render(tripInfo, new TotalPriceView(), RenderPosition.BEFORE_END);
render(controls, new NavigationView(navigationsData), RenderPosition.AFTER_BEGIN);
render(controls, new FiltersView(filtersData), RenderPosition.BEFORE_END);
render(tripEvents, new SortView(sortData), RenderPosition.BEFORE_END);

const renderPointsList = (container, points) => {
  const pointsList = new PointsListView().getElement();

  render(container, pointsList, RenderPosition.BEFORE_END);

  points.forEach((point) => {
    renderPoint(pointsList, point);
  });
};

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  pointComponent.setClickHandler(() => {
    replace(pointEditComponent, pointComponent);
  });

  pointEditComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    replace(pointComponent, pointEditComponent);
  });

  pointEditComponent.setClickHandler(() => {
    replace(pointComponent, pointEditComponent);
  });

  render(pointListElement, pointComponent, RenderPosition.BEFORE_END);
};

renderPointsList(tripEvents, tripPoints);
