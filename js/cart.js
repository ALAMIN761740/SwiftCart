export const cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

export function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.length;
}
