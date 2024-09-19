// class is an object generator 
class Cart { // this is class and we can use it to generate object
  // Inside class we use "=" instead of ":" and ";" instead of ","
  #localStorageKey; // we created a property localstoragekey because we can't pass it like a function
  cartItems;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [] ;
  }
  
  addProductToCart (quantity, productId, extraInfo) {
    const cartItem = this.getCartItem(productId)
    if(cartItem) {
      cartItem.quantity = quantity;
      cartItem.extraInfo = extraInfo;
    }else {
      this.cartItems.push({productId, quantity, option: "1", extraInfo});
    };
    this.saveCartIntoLocalStorage();
  };

  getTotalQuantity() {
    let quantity = 0;
    this.cartItems.forEach(cartItem => {
      quantity += cartItem.quantity;
    });
    return quantity;
  };

  saveCartIntoLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };

  updateDeliveryOption(productId, option) {
    const cartItem = this.getCartItem(productId);
    cartItem.option = option;
    this.saveCartIntoLocalStorage();
  };

  deleteProductFromCart(productId) {
    this.cartItems = this.cartItems.filter (cartItem => cartItem.productId !== productId);
    this.saveCartIntoLocalStorage();
  };

  updateProductQuantity(productId) {
    const cartItem = this.getCartItem(productId)
    const newQuantity = Number(document.querySelector(`.js-cart-item-container-${productId} .js-input-new-quantity`).value);
    cartItem.quantity = newQuantity > 0 ? newQuantity : 1;
    this.saveCartIntoLocalStorage();
  };

  getCartItem(productId) {
    const cartItem = this.cartItems.find( cartItem => cartItem.productId === productId);
    return cartItem;
  };

};

export const cart = new Cart("cart");