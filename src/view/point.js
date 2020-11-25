import dayjs from "dayjs";

import {OFFERS} from "../const";

const formatDate = (date, template) => dayjs(date).format(template);

const getDuration = (firstDate, secondDate) => {
  const minute = 60000;
  const hour = 3600000;
  const day = 86400000;

  const formattedFirstDate = dayjs(firstDate);
  const formattedSecondDate = dayjs(secondDate);
  const diff = formattedSecondDate.diff(formattedFirstDate, `millisecond`);

  if ((hour - minute) >= diff) {

    return dayjs(diff).format(`mm[M]`);
  } else if (diff >= hour && diff < day) {

    return dayjs(diff).format(`hh[H] mm[M]`);
  } else {

    return dayjs(diff).format(`DD[D] hh[H] mm[M]`);
  }
};

const getOfferItem = (offerId) => {
  const offer = OFFERS.find((offerItem) => offerItem.id === offerId);

  return `<li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </li>`;
};

export const getPointTemplate = (point) => {
  const {type, destination, startDate, endDate, price, isFavorite, offerIds} = point;

  const date = formatDate(startDate, `MMM DD`);
  const startTime = formatDate(startDate, `HH:mm`);
  const startTimeUTC = formatDate(startDate, ``);
  const endTime = formatDate(endDate, `HH:mm`);
  const endTimeUTC = formatDate(endDate, ``);
  const duration = getDuration(startDate, endDate);
  const favoriteClassName = isFavorite ? `event__favorite-btn--active` : ``;


  const offerTemplates = offerIds.map((id) => getOfferItem(id)).join();

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${startTimeUTC}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
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
