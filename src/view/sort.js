import {createElement} from "../utils";

const getSortItemsTemplate = (sortList) => {
  return sortList.map(({title, isDisabled}, index) => {
    const disabled = isDisabled ? `disabled` : ``;
    const checked = index === 0 ? `checked` : ``;

    return `<div class="trip-sort__item  trip-sort__item--${title}">
              <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${checked} ${disabled}>
              <label class="trip-sort__btn" for="sort-${title}">${title}</label>
            </div>`;
  }).join(``);
};

const getSortListTemplate = (sortList) => {
  const sortTemplate = getSortItemsTemplate(sortList);

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortTemplate}
          </form>`;
};


export default class Sort {
  constructor(sortList) {
    this._sortList = sortList;

    this._element = null;
  }

  getTemplate() {
    return getSortListTemplate(this._sortList);
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