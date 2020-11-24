import dayjs from "dayjs";

import {getRandomInteger} from "../utils";

import {OFFERS, TRIP_DESTINATIONS, TRIP_TYPES} from "../const";

const getDescription = () => {
  const descriptions = [
    ``,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`,
  ];

  return descriptions[getRandomInteger(0, descriptions.length - 1)];
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
