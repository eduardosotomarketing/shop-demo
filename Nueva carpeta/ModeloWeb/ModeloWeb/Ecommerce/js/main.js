// ===============================
// 🛒 CARRITO CON LOCALSTORAGE
// SE BORRA AL RECARGAR
// ===============================

// Detectar primera carga vs recarga
if (sessionStorage.getItem("pageLoaded")) {
  // Si ya estaba cargada → es recarga
  localStorage.removeItem("cart");
} else {
  // Primera carga
  sessionStorage.setItem("pageLoaded", "true");
}

// Obtener carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Actualizar contador
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

updateCartCount();

// BOTONES AGREGAR
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("added")) return;

    const product = {
      id: button.dataset.id || Date.now(),
      name: button.dataset.name || "Producto",
      price: button.dataset.price || 0
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Estado visual ✔
    button.classList.add("added");
    button.textContent = "Agregado";
  });
});

// ===============================
// 📱 MENÚ MOBILE
// ===============================
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });
}

// ===============================
// ✨ ANIMACIONES
// ===============================
const fadeElements = document.querySelectorAll(".fade-up");

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));
}
