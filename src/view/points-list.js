import AbstractView from "./abstract";

const getPointsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class PointsList extends AbstractView {
  getTemplate() {
    return getPointsListTemplate();
  }
}
