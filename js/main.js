import { fetchProducts } from "./api.js";
import { addToCart } from "./cart.js";

const trendingContainer = document.getElementById("trending-container");

async function displayTrending() {
  const products = await fetchProducts();
  // Show first 3 products as trending
  const trendingProducts = products.slice(0, 3);

  trendingProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md hover:shadow-xl p-5 flex flex-col";

    card.innerHTML = `
      <img src="${product.image}" class="h-56 object-contain mb-4" alt="${product.title}" />
      <span class="text-xs bg-base-200 px-3 py-1 rounded-full w-fit">Category: ${product.category}</span>
      <h3 class="font-semibold mt-3 flex-grow">${product.title.slice(0, 50)}...</h3>
      <p class="font-bold text-lg mt-2">$${product.price}</p>
      <div class="flex gap-3 mt-4">
        <button class="btn btn-outline btn-sm flex-1">Details</button>
        <button class="btn btn-primary btn-sm flex-1">Add</button>
      </div>
    `;

    const addBtn = card.querySelector(".btn-primary");
    addBtn.addEventListener("click", () => addToCart(product));

    trendingContainer.appendChild(card);
  });
}

// Initialize
displayTrending();
