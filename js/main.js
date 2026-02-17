import { fetchProducts, fetchCategories } from "./api.js";
import { addToCart, updateCartCount } from "./cart.js";

const productContainer = document.getElementById("product-list");
const trendingContainer = document.getElementById("trending-container");
const categoryContainer = document.getElementById("category-container");
const modal = document.getElementById("productModal");

let allProducts = [];

function toggleLoading(show) {
  const loader = document.getElementById("loading");
  if (loader) loader.classList.toggle("hidden", !show);
}

function generateStars(rate) {
  let stars = "";
  const rounded = Math.round(rate);
  for (let i = 1; i <= 5; i++) {
    stars += i <= rounded
      ? `<i class="fa-solid fa-star text-amber-500"></i>`
      : `<i class="fa-regular fa-star text-amber-500"></i>`;
  }
  return stars;
}

function showDetails(product) {
  document.getElementById("modal-title").textContent = product.title;
  document.getElementById("modal-description").textContent = product.description;
  document.getElementById("modal-price").textContent = "$" + product.price;
  document.getElementById("modal-add").onclick = () => addToCart(product);
  modal.showModal();
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card bg-white shadow-lg p-4";

  card.innerHTML = `
    <img src="${product.image}" class="h-40 object-contain mx-auto"/>
    <div class="mt-4">
      <span class="text-xs bg-base-200 px-2 py-1 rounded">${product.category}</span>
      <h3 class="font-semibold mt-2 text-sm">${product.title.substring(0,40)}...</h3>
      <p class="font-bold text-primary mt-1">$${product.price}</p>
      <div class="text-xs mt-1">${generateStars(product.rating.rate)}</div>
      <div class="flex gap-2 mt-3">
        <button class="btn btn-outline btn-sm flex-1">Details</button>
        <button class="btn btn-primary btn-sm flex-1">Add</button>
      </div>
    </div>
  `;

  card.querySelector(".btn-outline").onclick = () => showDetails(product);
  card.querySelector(".btn-primary").onclick = () => addToCart(product);

  return card;
}

function displayProducts(products) {
  if (!productContainer) return;
  productContainer.innerHTML = "";
  products.forEach(p => productContainer.appendChild(createProductCard(p)));
}

async function loadProducts() {
  toggleLoading(true);
  allProducts = await fetchProducts();
  displayProducts(allProducts);
  toggleLoading(false);
}

async function loadCategories() {
  if (!categoryContainer) return;
  const categories = await fetchCategories();

  categoryContainer.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className = "btn btn-primary";
  allBtn.onclick = () => displayProducts(allProducts);
  categoryContainer.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = "btn btn-outline btn-primary";
    btn.onclick = () => {
      const filtered = allProducts.filter(p => p.category === cat);
      displayProducts(filtered);
    };
    categoryContainer.appendChild(btn);
  });
}

async function displayTrending() {
  if (!trendingContainer) return;
  const products = await fetchProducts();
  products.slice(0,3).forEach(p => trendingContainer.appendChild(createProductCard(p)));
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadCategories();
  displayTrending();
  updateCartCount();
});
