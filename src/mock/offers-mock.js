import {getRandomInteger} from "../utils";

import {OFFERS} from "../const";

export const generateOffers = (minOffersCount, maxOffersCount) => {
  const randomInteger = getRandomInteger(minOffersCount, maxOffersCount);

  // это сделано чтобы иногда была нудевая длина возвращаемого массива

  return new Array(randomInteger).fill().map((item, index) => {
    return {
      id: OFFERS[index].id,
      title: OFFERS[index].title,
      price: OFFERS[index].price,
    };
  });
};
