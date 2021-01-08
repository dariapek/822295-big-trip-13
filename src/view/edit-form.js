import {formatDate, getRandomInteger} from "../utils/common";
import {TRIP_TYPES, TRIP_DESTINATIONS, OFFERS, FIRST} from "../const";
import AbstractView from "./abstract";

const getPhotosTemplate = (photos) => {

  return photos.map((photo) => {
    return `<img class="event__photo" src="${photo}" alt="Event photo">`;
  }).join(``);
};

const getDestinationSectionTemplate = (description, photos) => {
  const descriptionTemplate = description ?
    `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${description}</p>` : ``;

  const photosTemplate = photos ?
    `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${getPhotosTemplate(photos)}
        </div>
    </div>` : ``;

  return description || photos ? `<section class="event__section  event__section--destination">
              ${descriptionTemplate}
              ${photosTemplate}
           </section>` : ``;
};

const getOffersTemplate = (offers, checkedOffers = []) => {

  return offers.map(({id, title, price}) => {
    const isEditForm = Boolean(checkedOffers.length);
    const randomChecked = getRandomInteger(0, 1) ? `checked` : ``;
    const checkedOffer = checkedOffers.includes(id) ? `checked` : ``;
    const isChecked = isEditForm ? checkedOffer : randomChecked;
    const idPrefix = isEditForm ? `edit` : `create`;

    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${id}${idPrefix}" type="checkbox" name="event-offer-comfort" ${isChecked}>
              <label class="event__offer-label" for="${id}${idPrefix}">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`;
  }).join(``);
};

const getEventTypeListItemTemplate = (tripTypes) => {

  return tripTypes.map((type) => {
    const lowerCaseType = type.toLowerCase();

    return `<div class="event__type-item">
              <input id="event-type-${lowerCaseType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerCaseType}">
              <label class="event__type-label  event__type-label--${lowerCaseType}" for="event-type-${lowerCaseType}-1">${type}</label>
            </div>`;
  }).join(``);
};

const getDestinationOptionsTemplate = (destinations) => {

  return destinations.map((destination) => {
    return `<option value="${destination}"></option>`;
  }).join(``);
};

const getEditTemplate = (pointData) => {
  const {
    destination,
    price,
    idPrefix,
    tripType,
    formattedStartDate,
    formattedEndDate,
    resetButtonText,
    isCreateForm,
    offerIds,
    description,
    photos,
  } = pointData;

  const eventTypeItemsTemplate = getEventTypeListItemTemplate(TRIP_TYPES);
  const destinationItemsTemplate = getDestinationOptionsTemplate(TRIP_DESTINATIONS);
  const offersTemplate = getOffersTemplate(OFFERS, isCreateForm ? [] : offerIds);
  const destinationSectionTemplate = getDestinationSectionTemplate(description, photos);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${idPrefix}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${tripType.toLowerCase()}.png" alt="Event type icon">
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
                      ${tripType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination || ``}" list="destination-list-1">
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
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offersTemplate}
                    </div>
                  </section>
                  ${destinationSectionTemplate}
              </form>
            </li>`;
};

export default class EditPoint extends AbstractView {
  constructor(point = {}) {
    super();
    this._data = EditPoint.parsePointToData(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this.callbacks.submit(EditPoint.parseDataToPoint(this._data));
  }

  _clickHandler(evt) {
    this.callbacks.click(evt);
  }

  getTemplate() {
    return getEditTemplate(this._data);
  }

  setFormSubmitHandler(submitCallback) {
    this.callbacks.submit = submitCallback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setClickHandler(clickCallback) {
    this.callbacks.click = clickCallback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }

  static parsePointToData(point) {
    const {
      type,
      startDate,
      endDate,
    } = point;
    const defaultTripType = TRIP_TYPES[FIRST];
    const isCreateForm = !Object.keys(point).length;
    const tripType = isCreateForm ? defaultTripType : type;
    const formattedStartDate = isCreateForm ? `` : formatDate(startDate, `DD/MM/YY HH:mm`);
    const formattedEndDate = isCreateForm ? `` : formatDate(endDate, `DD/MM/YY HH:mm`);
    const resetButtonText = isCreateForm ? `Cancel` : `Delete`;
    const idPrefix = isCreateForm ? `1` : `2`;

    return Object.assign(
        {},
        point,
        {
          isCreateForm,
          tripType,
          formattedStartDate,
          formattedEndDate,
          resetButtonText,
          idPrefix,
        }
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isCreateForm;
    delete data.tripType;
    delete data.formattedStartDate;
    delete data.formattedEndDate;
    delete data.resetButtonText;
    delete data.idPrefix;

    return data;
  }
}
