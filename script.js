    // Simulación de base de datos
    const products = [
      {
        id: "1",
    name: "Camiseta Hombre",
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
        price: 75.00,
        img: "img/shop/3.jpg",
        description: "Pantalón versátil ideal para cualquier ocasión."
      }
    ];

    // Obtener ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const product = products.find(p => p.id === productId);

    if (product) {
  const mainImg = document.getElementById("MainImg");
  const thumbnails = document.getElementById("thumbnails");

  mainImg.src = product.images[0]; // Primera imagen como principal

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
  document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
  document.getElementById("product-description").textContent = product.description;
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartTotalEl = document.getElementById("cart-total");

  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
    cartItemsEl.appendChild(li);
    total += item.price * item.qty;
  });

  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = cart.length;
}

function addToCart(product) {
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartDisplay();
}

document.getElementById("cart-icon").addEventListener("click", (e) => {
  e.preventDefault();
  const cartEl = document.getElementById("cart");
  cartEl.style.display = cartEl.style.display === "none" ? "block" : "none";
});

// Evento para botón de compra del producto
document.querySelector(".buy-btn").addEventListener("click", () => {
  if (product) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price
    });
    alert("Producto agregado al carrito");
  }
});

updateCartDisplay();

// Escuchar todos los botones o imágenes con clase add-to-cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    if (id && name && !isNaN(price)) {
      addToCart({ id, name, price });
      alert(`${name} agregado al carrito`);
    }
  });
});
