import {getRandomInteger} from "../utils";

import {OFFERS} from "../const";

export const generateOffers = () => {

  const MIN_OFFERS_COUNT = 0;
  const MAX_OFFERS_COUNT = 4;
  const randomInteger = getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT);

  // это сделано чтобы иногда была нудевая длина возвращаемого массива

  return new Array(randomInteger).fill().map((item, index) => {
    return {
      id: OFFERS[index].id,
      title: OFFERS[index].title,
      price: OFFERS[index].price,
    };
  });
};
