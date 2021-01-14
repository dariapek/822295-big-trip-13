import {dayjs} from "../utils/dayjs";
import {getOfferMockData} from "./offers-mock";

import {getRandomInteger, getRandomItemFromArray, getRandomElements} from "../utils/common";
import {TRIP_TYPES, TRIP_DATE, TRIP_DESTINATIONS} from "../const";

const getId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getTripDate = () => {
  const daysStartGap = getRandomInteger(0, TRIP_DATE.MAX_START_DAYS_GAP);
  const daysEndGap = getRandomInteger(0, TRIP_DATE.MAX_END_DAYS_GAP);

  const startDate = dayjs()
    .add(daysStartGap, `day`)
    .add(getRandomInteger(0, TRIP_DATE.MAX_HOUR), `hour`)
    .add(getRandomInteger(0, TRIP_DATE.MAX_MINUTE), `minute`)
    .toDate();
  const endDate = dayjs(startDate)
    .add(daysEndGap, `day`)
    .add(getRandomInteger(0, TRIP_DATE.MAX_HOUR), `hour`)
    .add(getRandomInteger(0, TRIP_DATE.MAX_MINUTE), `minute`)
    .toDate();

  return {
    startDate,
    endDate,
  };
};


export const generateTripPoint = () => {
  const {startDate, endDate} = getTripDate();
  const type = getRandomItemFromArray(TRIP_TYPES);
  const pointOffer = getOfferMockData().find(({type: offerType}) => offerType === type);
  const offerTitles = pointOffer.offers.length ? getRandomElements(pointOffer.offers, getRandomInteger(0, pointOffer.offers.length)).map((offer) => offer.title) : ``;

  return {
    id: getId(),
    type,
    destination: getRandomItemFromArray(TRIP_DESTINATIONS),
    startDate,
    endDate,
    price: getRandomInteger(1, 2000),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offerTitles,
  };
};
