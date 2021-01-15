import {dayjs} from "../utils/dayjs";

import {formatDate} from "../utils/common";
import {TRIP_TYPES, TRIP_DESTINATIONS, FIRST} from "../const";
import Smart from "./smart";

import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const getPhoto = (photo, alt) => {

  return `<img class="event__photo" src="${photo}" alt="${alt}">`;
};

const getPhotosTemplate = (destinationInfo) => {
  const photos = destinationInfo.pictures.map(({src, description: alt}) => {
    return getPhoto(src, alt);
  }).join(``);

  return `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${photos}
              </div>
          </div>`;
};

const getDestinationSectionTemplate = (destinationInfo) => {
  const description = destinationInfo.description;
  const descriptionTemplate = description ?
    `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${destinationInfo.description}</p>` : ``;

  const photosTemplate = destinationInfo.pictures.length ? getPhotosTemplate(destinationInfo) : ``;

  return description || destinationInfo.pictures ? `<section class="event__section  event__section--destination">
              ${descriptionTemplate}
              ${photosTemplate}
           </section>` : ``;
};

const getOffersTemplate = (offers, isCreateMode, checkedOffers) => {
  if (offers.length) {
    const offerTemplate = offers.map(({title, price}) => {
      const isChecked = checkedOffers.includes(title) ? `checked` : ``;

      return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${title}" type="checkbox" name="${title}" ${isChecked}>
              <label class="event__offer-label" for="${title}">
                <span class="event__offer-title">${title}</span>
                 &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`;
    });

    return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${offerTemplate.join(``)}
              </div>
            </section>`;
  } else {
    return ``;
  }
};

const getEventTypeListItemTemplate = (tripTypes) => {

  return tripTypes.map((type) => {
    const lowerCaseType = type.toLowerCase();

    return `<div class="event__type-item">
              <input id="event-type-${lowerCaseType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
              <label class="event__type-label  event__type-label--${lowerCaseType}" for="event-type-${lowerCaseType}-1">${type}</label>
            </div>`;
  }).join(``);
};

const getDestinationOptionsTemplate = (destinations) => {

  return destinations.map((destination) => {
    return `<option value="${destination}"></option>`;
  }).join(``);
};

const getEditTemplate = (pointData, offersList, destinationInfo) => {
  const {
    price,
    idPrefix,
    type,
    startDate,
    endDate,
    resetButtonText,
    isCreateMode,
    offerTitles,
  } = pointData;

  const {offers} = offersList;

  const eventTypeItemsTemplate = getEventTypeListItemTemplate(TRIP_TYPES);
  const destinationItemsTemplate = getDestinationOptionsTemplate(TRIP_DESTINATIONS);
  const offersTemplate = getOffersTemplate(offers, isCreateMode, offerTitles);
  const destinationSectionTemplate = getDestinationSectionTemplate(destinationInfo);

  const formattedStartDate = isCreateMode ? `` : formatDate(startDate, `DD/MM/YY HH:mm`);
  const formattedEndDate = isCreateMode ? `` : formatDate(endDate, `DD/MM/YY HH:mm`);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${idPrefix}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${idPrefix}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypeItemsTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationInfo.name || ``}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationItemsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedStartDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedEndDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price || ``}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${resetButtonText}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${offersTemplate}
                  ${destinationSectionTemplate}
              </form>
            </li>`;
};

export default class EditPoint extends Smart {
  constructor(point = {}, offersList, destinationsList) {
    super();
    this._data = EditPoint.parsePointToData(point);
    this._offersList = offersList;
    this._destinationsList = destinationsList;
    this._startDateDatepicker = null;
    this._endDateDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._offerToggleHandler = this._offerToggleHandler.bind(this);
    this._pointTypeChangeHandler = this._pointTypeChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._timeInputHandler = this._timeInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startDayChangeHandler = this._startDayChangeHandler.bind(this);
    this._endDayChangeHandler = this._endDayChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickerStartDay();
    this._setDatepickerEndDay();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this.callbacks.submit(EditPoint.parseDataToPoint(this._data));
  }

  _clickHandler(evt) {
    this.callbacks.click(evt);
  }

  _offerToggleHandler(evt) {
    evt.preventDefault();
    const targetId = evt.target.id;
    let offerTitlesCopy = this._data.offerTitles.slice();

    if (offerTitlesCopy.includes(targetId)) {
      offerTitlesCopy = offerTitlesCopy.filter((offer) => offer !== targetId);
    } else {
      offerTitlesCopy.push(targetId);
    }

    this.updateData({
      offerTitles: offerTitlesCopy,
    });
  }

  _pointTypeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }

  _destinationInputHandler(evt) {
    const targetDestination = evt.target.value;
    const isDestination = this._getPointDestination(this._destinationsList, evt.target.value);

    this.updateData({
      destination: targetDestination,
    }, !isDestination);
  }

  _timeInputHandler(evt) {
    const formattedDate = dayjs(evt.target.value, `DD/MM/YY HH:mm`).toDate();

    if (evt.target.name === `event-start-time`) {
      this.updateData({
        startDate: formattedDate
      }, true);
    } else {
      this.updateData({
        endDate: formattedDate
      }, true);
    }
  }

  _priceInputHandler(evt) {
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _startDayChangeHandler([startDate]) {
    this.updateData({
      startDate
    }, true);
  }

  _endDayChangeHandler([endDate]) {
    this.updateData({
      endDate
    }, true);
  }

  _setInnerHandlers() {
    const offersContainer = this.getElement()
      .querySelector(`.event__available-offers`);

    if (offersContainer) {
      offersContainer.addEventListener(`change`, this._offerToggleHandler);
    }

    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._pointTypeChangeHandler);

    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationInputHandler);

    this.getElement()
      .querySelectorAll(`.event__input--time`)
      .forEach((timeInput) => {
        timeInput.addEventListener(`input`, this._timeInputHandler);
      });

    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
  }

  _setDatepickerStartDay() {
    if (this._startDateDatepicker) {
      this._startDateDatepicker.destroy();
      this._startDateDatepicker = null;
    }

    this._startDateDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.startDate,
          onChange: this._startDayChangeHandler
        }
    );
  }

  _setDatepickerEndDay() {
    if (this._endDateDatepicker) {
      this._endDateDatepicker.destroy();
      this._endDateDatepicker = null;
    }

    this._endDateDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.endDate,
          minDate: this._data.startDate,
          onChange: this._startDayChangeHandler
        }
    );
  }

  _getPointOffer(offers) {
    return offers.find(({type}) => type === this._data.type);
  }

  _getPointDestination(destinationsList, destination) {
    return destinationsList.find(({name}) => name === destination);
  }

  getTemplate() {
    const offers = this._getPointOffer(this._offersList);
    const destination = this._getPointDestination(this._destinationsList, this._data.destination);

    return getEditTemplate(this._data, offers, destination);
  }

  setFormSubmitHandler(submitCallback) {
    this.callbacks.submit = submitCallback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setClickHandler(clickCallback) {
    this.callbacks.click = clickCallback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerStartDay();
    this._setDatepickerEndDay();
    this.setFormSubmitHandler(this.callbacks.submit);
    this.setClickHandler(this.callbacks.click);
  }

  static parsePointToData(point) {
    const {
      type,
    } = point;
    const defaultTripType = TRIP_TYPES[FIRST];
    const isCreateMode = !Object.keys(point).length;
    const resetButtonText = isCreateMode ? `Cancel` : `Delete`;
    const idPrefix = isCreateMode ? `1` : `2`;

    return Object.assign(
        {},
        point,
        {
          type: isCreateMode ? defaultTripType : type,
          isCreateMode,
          resetButtonText,
          idPrefix,
        }
    );
  }

  static parseDataToPoint(data) {
    let point = Object.assign({}, data);

    delete point.isCreateMode;
    delete point.resetButtonText;
    delete point.idPrefix;

    return point;
  }
}
