
const container = document.getElementById("product-container");

function displayProducts(products) {
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow p-4";

    card.innerHTML = `
      <figure>
        <img src="${product.image}" class="h-40 object-contain mx-auto"/>
      </figure>
      <h2 class="font-bold mt-2 text-sm">
        ${product.title.slice(0, 40)}...
      </h2>
      <p class="text-primary font-semibold mt-2">
        $${product.price}
      </p>
      <p class="text-sm">⭐ ${product.rating.rate}</p>
      <button class="btn btn-sm btn-primary mt-3">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
}

fetchProducts().then(data => {
  displayProducts(data);
});
