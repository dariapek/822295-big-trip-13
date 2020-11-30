import dayjs from "dayjs";

import {getRandomInteger, getRandomItemFromArray} from "../utils";
import {
  OFFERS,
  TRIP_DESTINATIONS,
  TRIP_TYPES,
  DESCRIPTIONS,
  MAX_PHOTO,
  TRIP_DATE,
} from "../const";

const getDescription = (descriptions) => {
  const randomElement = getRandomInteger(0, descriptions.length - 1);

  return descriptions
    .slice(randomElement)
    .join(``);
};

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

const getRandomOffersId = (offers) => {
  const maxArrayLength = 3;
  const minCount = getRandomInteger(0, 1);
  const maxCount = getRandomInteger(minCount, offers.length - maxArrayLength + minCount);

  return offers.map((offer) => offer.id).splice(minCount, maxCount);
};

export const generateTripPoint = () => {
  const {startDate, endDate} = getTripDate();

  return {
    type: getRandomItemFromArray(TRIP_TYPES),
    destination: getRandomItemFromArray(TRIP_DESTINATIONS),
    startDate,
    endDate,
    price: getRandomInteger(1, 2000),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offerIds: getRandomOffersId(OFFERS),
    photos: getPhotos(),
    description: getDescription(DESCRIPTIONS),
  };
};
