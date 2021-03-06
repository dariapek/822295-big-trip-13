import AbstractView from "./abstract";

const getNavigationTemplate = (navigationData) => {
  return navigationData.map(({title, isActive}) => {
    const activeClass = isActive ? `trip-tabs__btn--active` : ``;

    return `<a class="trip-tabs__btn  ${activeClass}" href="#">${title}</a>`;
  }).join(``);
};

const getNavigation = (navigationData) => {
  const navigationTemplate = getNavigationTemplate(navigationData);

  return `<div>
            <h2 class="visually-hidden">Switch trip view</h2>
            <nav class="trip-controls__trip-tabs  trip-tabs">
              ${navigationTemplate}
            </nav>
          </div>`;
};


export default class Navigation extends AbstractView {
  constructor(navigationData) {
    super();
    this._navigationData = navigationData;
  }

  getTemplate() {
    return getNavigation(this._navigationData);
  }
}
