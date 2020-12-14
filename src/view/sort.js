import AbstractView from "./abstract";

const sortData = [
  {
    title: `day`,
    isDisabled: false,
  },
  {
    title: `event`,
    isDisabled: true,
  },
  {
    title: `time`,
    isDisabled: false,
  },
  {
    title: `price`,
    isDisabled: false,
  },
  {
    title: `offer`,
    isDisabled: true,
  },
];

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


export default class Sort extends AbstractView {
  constructor() {
    super();
    this._sortList = sortData;
  }

  getTemplate() {
    return getSortListTemplate(this._sortList);
  }
}
