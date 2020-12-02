import {createElement} from "../utils";

const getFiltersItemsTemplate = (filters) => {
  return filters.map((filterTitle, index) => {
    const checked = index === 0 ? `checked` : ``;

    return `<div class="trip-filters__filter">
                <input id="filter-${filterTitle}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterTitle}" ${checked}>
                <label class="trip-filters__filter-label" for="filter-${filterTitle}">${filterTitle}</label>
              </div>`;
  }).join(``);
};

const getFiltersList = (filters) => {
  const filtersTemplate = getFiltersItemsTemplate(filters);

  return `<div>
            <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
              ${filtersTemplate}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
          </div>`;
};

export default class Filters {
  constructor(filters) {
    this._filters = filters;

    this._element = null;
  }

  getTemplate() {
    return getFiltersList(this._filters);
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
