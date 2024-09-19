import { loadProductsFetch } from "./data/products.js";
import { renderOrderSummary } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";


async function loadPage() {
  await loadProductsFetch()
  renderOrderSummary();
  renderPaymentSummary();
};
loadPage();
