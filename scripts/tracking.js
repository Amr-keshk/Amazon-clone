import { loadProductsFetch, products } from "./data/products.js";
import { cart } from "./data/cart-class.js";
import { loadOrders } from "./orders.js";
import { orders } from "./orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.8.9/esm/index.js';
const url = new URL (window.location.href)
const productId = url.searchParams.get('productId');

loadPage();
async function loadPage() {
 await loadProductsFetch();
 await loadOrders();

 let productHTML = '';
 
 const product = products.find( product => product.id === productId) ;
 const order = orders.products.find( item => item.productId === productId)
 
 productHTML = `
   <div class="order-tracking">
     <a class="back-to-orders-link link-primary" href="orders.html">
       View all orders
     </a>
 
     <div class="delivery-date">
       Arriving on ${dayjs(order.estimatedDeliveryTime).format('dddd, MMM D')}
     </div>
 
     <div class="product-info">
       ${product.name}
     </div>
 
     <div class="product-info">
       Quantity: ${order.quantity}
     </div>
 
     <img class="product-image" src=${product.image}>
 
     <div class="progress-labels-container">
       <div class="progress-label">
         Preparing
       </div>
       <div class="progress-label current-status">
         Shipped
       </div>
       <div class="progress-label">
         Delivered
       </div>
     </div>
 
     <div class="progress-bar-container">
       <div class="progress-bar"></div>
     </div>
   </div>
 
 `;


 document.querySelector('.main').innerHTML = productHTML;

 const time = ( dayjs().diff(dayjs(orders.orderTime), 'day') ) / (dayjs(order.estimatedDeliveryTime).diff(dayjs(orders.orderTime), 'day') ) * 100;
 document.querySelector('.progress-bar').style.width = time;
}

