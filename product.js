  const products = [
    {
      id: "1",
      name: "Camiseta Hombre",
      category: "Hombres",
      price: 92.00,
      images: [
        "img/shop/1.jpg",
        "img/shop/24.jpg",
        "img/shop/25.jpg",
        "img/shop/26.jpg"
      ],
      description: "Camiseta de algodón suave para uso diario."
    },
    {
      id: "2",
      name: "Zapatillas Deportivas",
      category: "Hombres",
      price: 120.00,
      images: [
        "img/shop/2.jpg",
        "img/shop/4.jpg",
        "img/shop/5.jpg",
        "img/shop/6.jpg"
      ],
      description: "Zapatillas cómodas para caminar o correr."
    },
    {
      id: "3",
      name: "Pantalón Casual",
      category: "Hombres",
      price: 75.00,
      images: ["img/shop/3.jpg"],
      description: "Pantalón versátil ideal para cualquier ocasión."
    },
    {
      id: "3",
      name: "Pantalón Casual",
      category: "Hombres",
      price: 75.00,
      images: ["img/shop/3.jpg"],
      description: "Pantalón versátil ideal para cualquier ocasión."
    }
  ];

   // Obtener ID del producto desde la URL
  const param = new URLSearchParams(window.location.search);
  const productId = param.get("id");

  const product = products.find(p => p.id === productId);

  if (product) {
    const mainImg = document.getElementById("MainImg");
    const thumbnails = document.getElementById("thumbnails");

    mainImg.src = product.images[0];

    product.images.forEach(imgUrl => {
      const thumb = document.createElement("img");
      thumb.src = imgUrl;
      thumb.className = "img-thumbnail m-1";
      thumb.style.width = "80px";
      thumb.style.cursor = "pointer";

      thumb.onclick = () => {
        mainImg.src = imgUrl;
      };

      thumbnails.appendChild(thumb);
    });

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-category").textContent = product.category; // NUEVO
    document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
    document.getElementById("product-description").textContent = product.description;
  }

  // Mostrar productos relacionados por categoría
const relatedContainer = document.getElementById("related-products");

const relatedProducts = products.filter(p =>
  p.category === product.category && p.id !== product.id
);

relatedProducts.forEach(p => {
  const div = document.createElement("div");
  div.className = "product text-center col-lg-3 col-md-4 col-6";
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
    <a href="?id=${p.id}" class="buy-btn btn btn-sm mt-2">Ver producto</a>
  `;
  relatedContainer.appendChild(div);
});
