import { cart } from "./data/cart-class.js";
import { deliveryOptions } from "./data/delivery_option.js";
import { products } from "./data/products.js";

export function renderPaymentSummary() {
  const totalQuantity = cart.getTotalQuantity();
  let shippingCost = 0;
  let totalProductCost = 0;
  cart.cartItems.forEach(cartItem => {
    const option = deliveryOptions.find( option => option.option === cartItem.option )
    shippingCost += option.priceCents;
    const product = products.find ( product => product.id === cartItem.productId);
    totalProductCost += product.priceCents * cartItem.quantity;
  });
  const totalBeforeTax = shippingCost + totalProductCost;
  const estimatedTax = totalBeforeTax * 10 / 100;
  const orderTotal = estimatedTax + totalBeforeTax;

  localStorage.setItem('orderTotal', orderTotal);
  document.querySelector('.payment-summary-quantity').textContent = `Items (${totalQuantity}):`;;
  document.querySelector('.js-products-money').textContent = `$${(totalProductCost / 100).toFixed(2)}`;
  document.querySelector('.js-shipping-cost').textContent = `$${(shippingCost / 100).toFixed(2)}`;
  document.querySelector('.js-total-before-tax').textContent = `$${(totalBeforeTax / 100).toFixed(2)}`;
  document.querySelector('.js-estimated-tax').textContent = `$${(estimatedTax / 100).toFixed(2)}`;
  document.querySelector('.js-order-total').textContent = `$${(orderTotal / 100).toFixed(2)}`;
};
document.querySelector('.js-place-order-button')?.addEventListener('click', () => {
  window.location.href = "orders.html"
});

