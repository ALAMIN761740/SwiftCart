export const cart = [];

export function addToCart(product) {
  cart.push(product);
  const cartCount = document.getElementById("cart-count");
  if(cartCount) cartCount.textContent = cart.length;
}
