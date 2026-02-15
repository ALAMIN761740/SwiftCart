const cartCount = document.getElementById("cart-count");
let cart = [];

function addToCart(product) {
  cart.push(product);
  cartCount.textContent = cart.length; // updates bubble
}
