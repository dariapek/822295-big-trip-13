import {dayjs} from "../utils/dayjs";
import {formatDate} from "../utils/common";
import AbstractView from "./abstract";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const getDuration = (firstDate, secondDate) => {
  const formattedFirstDate = dayjs(firstDate);
  const formattedSecondDate = dayjs(secondDate);
  const diff = formattedSecondDate.diff(formattedFirstDate, `millisecond`);

  if (diff < HOUR) {

    return dayjs(diff).format(`mm[M]`);
  } else if (diff < DAY) {

    return dayjs(diff).format(`hh[H] mm[M]`);
  } else {

    return dayjs(diff).format(`DD[D] hh[H] mm[M]`);
  }
};

const getOfferItem = (offers, title) => {
  const offer = offers.find((offerItem) => offerItem.title === title);

  return `<li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </li>`;
};

const getPointTemplate = (point, offersList) => {
  const {type, destination, startDate, endDate, price, isFavorite, offerTitles} = point;
  const date = formatDate(startDate, `MMM DD`);
  const startTime = formatDate(startDate, `HH:mm`);
  const startTimeUTC = formatDate(startDate, ``);
  const endTime = formatDate(endDate, `HH:mm`);
  const endTimeUTC = formatDate(endDate, ``);
  const duration = getDuration(startDate, endDate);
  const favoriteClassName = isFavorite ? `event__favorite-btn--active` : ``;

  const pointOffer = offersList.find(({type: pointType}) => pointType === type);
  const {offers} = pointOffer;

  const offerTemplates = offerTitles.length ? offerTitles.map((title) => getOfferItem(offers, title)).join(``) : ``;

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${startTimeUTC}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startTimeUTC}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endTimeUTC}">${endTime}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offerTemplates}
                </ul>
                <button class="event__favorite-btn ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
          </li>`;
};

export default class Point extends AbstractView {
  constructor(point, offersList) {
    super();
    this._point = point;
    this._offersList = offersList;

    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return getPointTemplate(this._point, this._offersList);
  }

  _clickHandler(evt) {
    this.callbacks.click(evt);
  }

  _favoriteClickHandler() {
    this.callbacks.favoriteClick();
  }

  setClickHandler(clickCallback) {
    this.callbacks.click = clickCallback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }

  setFavoriteClickHandler(callback) {
    this.callbacks.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
