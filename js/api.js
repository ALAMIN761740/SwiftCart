const BASE_URL = "https://fakestoreapi.com";

async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
}
