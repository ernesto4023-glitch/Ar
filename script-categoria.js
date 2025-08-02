

// 1. Leer la categoría de la URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// 2. Mostrar el nombre de la categoría
if (category && document.getElementById("category-title")) {
  document.getElementById("category-title").textContent = category;
}

// 3. Verificamos si hay productos
if (!products || !Array.isArray(products)) {
  console.error("No se encontró la lista de productos.");
} else {
  // 4. Filtrar productos por categoría
  const filteredProducts = products.filter(p =>
    p.category && p.category.toLowerCase() === category?.toLowerCase()
  );

  // 5. Contenedor para mostrar productos
  const container = document.getElementById("category-products");

  if (!container) {
    console.error("No se encontró el contenedor #category-products");
  } else {
    // 6. Mostrar productos filtrados
    if (filteredProducts.length > 0) {
      filteredProducts.forEach(p => {
        const div = document.createElement("div");
        div.className = "product text-center col-6 col-md-4 col-lg-3";
        div.innerHTML = `
          <img class="img-fluid mb-3" src="${p.images[0]}" alt="${p.name}">
          <div class="star">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
          <h5 class="p-name">${p.name}</h5>
          <h4 class="p-price">$${p.price.toFixed(2)}</h4>
          <a href="product.html?id=${p.id}" class="buy-btn">Ver Detalle</a>
        `;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = `<p>No hay productos en esta categoría.</p>`;
    }
  }
}
