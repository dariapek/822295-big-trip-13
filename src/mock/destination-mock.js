import {getRandomElements, getRandomInteger} from "../utils/common";
import {DESCRIPTIONS, MAX_PHOTO, TRIP_DESTINATIONS} from "../const";

const getPictures = () => {
  const randomInteger = getRandomInteger(1, MAX_PHOTO);

  return new Array(randomInteger).fill().map(() => {
    return {
      "src": `http://picsum.photos/248/152?r=${Math.random()}`,
      "description": getRandomElements(DESCRIPTIONS, getRandomInteger(1, 2)).join(``),
    };
  });
};

export const getDestinations = () => {
  return new Array(TRIP_DESTINATIONS.length).fill().map((destination, index) => {
    return {
      "description": getRandomElements(DESCRIPTIONS, getRandomInteger(0, 5)).join(``),
      "name": TRIP_DESTINATIONS[index],
      "pictures": getPictures(),
    };
  });
};
