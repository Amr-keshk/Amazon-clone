import { cart } from "./data/cart-class.js";
import { loadProductsFetch, products } from "./data/products.js";
import { deliveryOptions } from "./data/delivery_option.js";
import dayjs from 'https://unpkg.com/dayjs@1.8.9/esm/index.js';
import { renderPaymentSummary } from "./paymentSummary.js";

// Function Used To Render Products From Cart
export function renderOrderSummary() {
  let checkoutProductsHTMl = '';
  cart.cartItems.forEach(cartItem => {
    const option = deliveryOptions.find( option => option.option === cartItem.option)
    const date = dayjs().add(option.days, 'day').format('dddd, MMM D')
    const product = products.find( product => product.id === cartItem.productId)
    checkoutProductsHTMl += `
      <div class="cart-item-container js-cart-item-container-${product.id}">
        <div class="delivery-date">
          Delivery date: ${date}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src=${product.image} alt=${product.name}>
          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-price">
              $${product.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${product.id}>
                Update
              </span>
              <input class="input-new-quantity hide js-input-new-quantity"  type="number" />
              <span class="save-quantity-link link-primary hide js-save-quantity-link">
                save
              </span>
              <span class="delete-quantity-link link-primary" data-product-id=${product.id}>
                Delete
              </span>
            </div>

            <div>
              ${cartItem.extraInfo ? cartItem.extraInfo : ""}
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>

            ${renderDeliveryOptions(cartItem)}

          </div>
        </div>
      </div>
    `
  });
  // Render Products Those Got From Cart
  document.querySelector('.js-order-summary').innerHTML = checkoutProductsHTMl;
  // Render Total Quantity
  document.querySelector('.js-total-quantity').textContent = cart.getTotalQuantity();
  // Render Delivery Options For Every Product
  function renderDeliveryOptions(cartItem) {
    let deliveryOptionsHTML = ''
    deliveryOptions.forEach( option => {
      const date = dayjs().add(option.days, 'day').format("dddd, MMM D")
      const cost = option.priceCents ? `$${(option.priceCents / 100).toFixed(2)}` : `FREE Shipping`
      const checked = cartItem.option === option.option ? "checked" : "";
      deliveryOptionsHTML += `
        <div class="delivery-option js-delivery-option"
          data-option=${option.option}
          data-product-id=${cartItem.productId}
          >
          <input type="radio" ${checked}
            class="delivery-option-input"
            name="delivery-option-${cartItem.productId}"
            >
            
          <div>
            <div class="delivery-option-date">
              ${date}
            </div>
            <div class="delivery-option-price">
              ${cost}
            </div>
          </div>
        </div>
      `;
    });
    return deliveryOptionsHTML;
  };
  // Update Delivery Option Depends On User Click

  document.querySelectorAll('.js-delivery-option').forEach(element => {
    element.addEventListener('click', () => {
      const {option, productId} = element.dataset;
      cart.updateDeliveryOption(productId, option)
      renderOrderSummary();
    })
  });
  document.querySelectorAll(`.delete-quantity-link`).forEach(button => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      document.querySelector(`.js-cart-item-container-${productId}`).delete;
      cart.deleteProductFromCart(productId);
      renderOrderSummary();
    });
  });
  document.querySelectorAll('.js-update-quantity-link').forEach(element => {
    element.addEventListener('click', () => {
      const { productId } = element.dataset;
      const update = document.querySelector(`.js-cart-item-container-${productId} .js-update-quantity-link`)
      const save = document.querySelector(`.js-cart-item-container-${productId} .js-save-quantity-link`);
      const input = document.querySelector(`.js-cart-item-container-${productId} .js-input-new-quantity`);
      update.classList.add('hide') ;
      save.classList.add('show') ;
      input.classList.add('show') ;
      document.querySelector(`.js-cart-item-container-${productId} .js-save-quantity-link`).addEventListener('click', () => {
        cart.updateProductQuantity(productId);
        update.classList.remove('hide') ;
        save.classList.remove('show') ;
        input.classList.remove('show') ;
        renderOrderSummary();
      });
    });
  });
  renderPaymentSummary();
};