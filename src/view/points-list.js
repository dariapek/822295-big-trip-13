import {createElement} from "../utils";

const getPointsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class PointsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getPointsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
