import dayjs from "dayjs";

import {getRandomInteger, getRandomItemFromArray, getRandomElements} from "../utils/common";
import {
  OFFERS,
  TRIP_DESTINATIONS,
  TRIP_TYPES,
  DESCRIPTIONS,
  MAX_PHOTO,
  TRIP_DATE,
} from "../const";

const getId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getPhotos = () => {
  const randomInteger = getRandomInteger(1, MAX_PHOTO);

  return new Array(randomInteger).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

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

  return {
    id: getId(),
    type: getRandomItemFromArray(TRIP_TYPES),
    destination: getRandomItemFromArray(TRIP_DESTINATIONS),
    startDate,
    endDate,
    price: getRandomInteger(1, 2000),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offerIds: getRandomElements(OFFERS, getRandomInteger(0, 2)).map((offer) => offer.id),
    photos: getPhotos(),
    description: getRandomElements(DESCRIPTIONS, getRandomInteger(0, 5)).join(``),
  };
};
