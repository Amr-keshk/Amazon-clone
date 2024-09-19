
import { cart } from "./data/cart-class.js";
import { products, loadProductsFetch } from "./data/products.js";
const productsGrid = document.querySelector('.products-grid');

async function loadPage() {
  await loadProductsFetch()
  renderProducts()
}
loadPage()
function renderProducts() {
  let productsHTML = '';
  products.forEach(product => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src=${product.image}>
        </div>
  
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
  
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src=${product.getStarsUrl()}>
          <div class="product-rating-count link-primary">
            ${product.getRatingCount()}
          </div>
        </div>
  
        <div class="product-price">
          $${product.getPrice()}
        </div>
  
        <div class="selection-container">
          <div class="product-quantity-container">
            <select class="js-selected-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>
            ${product.getExtraInfo(product.id)}
          </div>
        </div>
  
  
        <div class="product-spacer"></div>
  
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>
  
        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id=${product.id}>
          Add to Cart
        </button>
      </div>
    `;
  });
  
  // ${(product instanceof Clothing) ? "<a>link to chart</a>" : ""} another way to show chart link instead of using getExtraInfo method 
  
  document.querySelector('.cart-quantity').innerHTML = cart.getTotalQuantity();
  
  productsGrid.innerHTML = productsHTML;
  
  let addedId = {} ;
  document.querySelectorAll('.js-add-to-cart-button').forEach(button => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      
      const quantity = Number(document.querySelector(`.js-selected-quantity-${productId}`).value)
      const extraInfo = document.querySelector(`.js-select-extra-info-${productId}`)?.value;
      console.log(extraInfo)
      cart.addProductToCart(quantity, productId, extraInfo);
  
      document.querySelector('.cart-quantity').innerHTML = cart.getTotalQuantity();
  
      document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = "1";
      clearTimeout(addedId[productId]);
      addedId[productId] = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = "0";
      }, 2000);
      
      
  
    });
  });
};