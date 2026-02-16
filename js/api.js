export const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  return await response.json();
}
