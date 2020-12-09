import AbstractView from "./abstract";

const getTotalPriceTemplate = () => {
  return `<p class="trip-info__cost">
             Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
          </p>`;
};

export default class TotalPrice extends AbstractView {
  getTemplate() {
    return getTotalPriceTemplate();
  }
}
