import dayjs from "dayjs";

import {getRandomInteger} from "../utils";

import {OFFERS, TRIP_DESTINATIONS, TRIP_TYPES, DESCRIPTIONS} from "../const";

const getDescription = () => {

  return DESCRIPTIONS
    .splice(getRandomInteger(0, DESCRIPTIONS.length - 1), getRandomInteger(0, DESCRIPTIONS.length - 1))
    .join(``);
};

const getPhotos = () => {
  const MAX_PHOTO = 6;
  const randomInteger = getRandomInteger(1, MAX_PHOTO);

  return new Array(randomInteger).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const getRandomItemFromArray = (array) => {
  const randomInteger = getRandomInteger(0, array.length - 1);

  return array[randomInteger];
};

const getTripDate = () => {
  const maxStartDaysGap = 60;
  const maxEndDaysGap = 3;
  const maxHour = 5;
  const maxMinute = 60;

  const daysStartGap = getRandomInteger(0, maxStartDaysGap);
  const daysEndGap = getRandomInteger(0, maxEndDaysGap);

  const startDate = dayjs().add(daysStartGap, `day`).add(getRandomInteger(0, maxHour), `hour`).add(getRandomInteger(0, maxMinute), `minute`).toDate();
  const endDate = dayjs(startDate).add(daysEndGap, `day`).add(getRandomInteger(0, maxHour), `hour`).add(getRandomInteger(0, maxMinute), `minute`).toDate();

  return {
    startDate,
    endDate,
  };
};

export const generateTripPoint = () => {
  const {startDate, endDate} = getTripDate();

  return {
    type: getRandomItemFromArray(TRIP_TYPES),
    destination: getRandomItemFromArray(TRIP_DESTINATIONS),
    startDate,
    endDate,
    price: getRandomInteger(1, 2000),
    isFavorite: !!getRandomInteger(0, 1),
    offerIds: [getRandomItemFromArray(OFFERS).id],
    photos: getPhotos(),
    description: getDescription(),
  };
};
