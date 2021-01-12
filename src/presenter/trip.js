import SortView from "../view/sort";
import PointsListView from "../view/points-list";
import PointPresenter from "../presenter/point";
import {render, RenderPosition} from "../utils/render";
import {updateItem} from "../utils/common";
import {sortData} from "../utils/sort";

export default class Trip {
  constructor(tripEventsContainer, offersList) {
    this._tripEventsContainer = tripEventsContainer;
    this._pointPresenter = {};

    this._offersList = offersList;

    this._sortComponent = new SortView(sortData);
    this._pointsListComponent = new PointsListView();

    this._handleTaskChanged = this._handleTaskChanged.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points;

    this._renderSort();
    this._renderPointsList();
    this._renderPoints(this._points);
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.BEFORE_END);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handleTaskChanged, this._handleModeChange, this._offersList);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderNoPoints() {
  }

  _renderPointsList() {
    render(this._tripEventsContainer, this._pointsListComponent, RenderPosition.BEFORE_END);
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => {
        presenter.destroy();
      });
  }

  _handleTaskChanged(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange(currentPrinter) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => {
        if (presenter !== currentPrinter) {
          presenter.resetView();
        }
      });
  }
}
