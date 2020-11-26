const getFiltersItemsTemplate = (filters) => {
  return filters.map((filterTitle, index) => {
    const checked = index === 0 ? `checked` : ``;

    return `<div class="trip-filters__filter">
                <input id="filter-${filterTitle}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterTitle}" ${checked}>
                <label class="trip-filters__filter-label" for="filter-${filterTitle}">${filterTitle}</label>
              </div>`;
  }).join(``);
};

export const getFiltersList = (filters) => {
  const filtersTemplate = getFiltersItemsTemplate(filters);

  return `<h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
              ${filtersTemplate}

              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};
