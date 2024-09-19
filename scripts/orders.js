import { cart } from "./data/cart-class.js";
import { loadProductsFetch, products } from "./data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.8.9/esm/index.js';
export let orders = JSON.parse(localStorage.getItem('orders'))
loadOrders();
export async function loadOrders(){
  try {
    const response = await fetch("https://supersimplebackend.dev/orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart: cart.cartItems,
      }),
    });
    const data = await response.json();
    orders = data;
    localStorage.setItem('orders', JSON.stringify(orders));
    await loadProductsFetch()
    addOrder();
  } catch (error) {
    console.log("Unexpected error, Please try again later");
  };
};

let ordersHTML = '';
function addOrder() {
  ordersHTML += `
    <div class="order-container">

      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dayjs(orders.orderTime).format('dddd, MMM D')}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${((localStorage.getItem('orderTotal')) / 100).toFixed(2)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orders.id}</div>
        </div>
      </div>

      ${loadProducts()}
    </div>
  `
  document.querySelector('.orders-grid') ? document.querySelector('.orders-grid').innerHTML = ordersHTML : ""
};
let productsHTML = '';
function loadProducts() {
  orders.products.forEach( order => {
    const product = products.find( product => product.id === order.productId);
    productsHTML += `
      <div class="order-details-grid">
        <div class="product-image-container">
          <img src=${product.image}>
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: June 17
          </div>
          <div class="product-quantity">
            Quantity: ${order.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${orders.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
    `;
  });

  return productsHTML;
};

document.querySelector('.cart-quantity').textContent = cart.getTotalQuantity();