import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formatDate = (date, template) => dayjs(date).format(template);

export const getRandomItemFromArray = (array) => {
  const randomInteger = getRandomInteger(0, array.length - 1);

  return array[randomInteger];
};

export const getRandomElements = (items, randomItemsCount) => {
  const elements = items.slice();

  return new Array(randomItemsCount).fill().map(() => {
    const randomIndex = getRandomInteger(0, elements.length - 1);
    const randomElement = elements[randomIndex];
    elements.splice(randomIndex, 1);

    return randomElement;
  });
};

export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (parentNode, newChild, oldChild) => {
  parentNode.replaceChild(newChild, oldChild);
};
