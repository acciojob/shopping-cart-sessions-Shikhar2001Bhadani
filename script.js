// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Function to render the product list
function renderProducts() {
  productList.innerHTML = ""; // Clear previous content
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Attach event listeners to buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(parseInt(button.dataset.id));
    });
  });
}

// Function to render the cart from sessionStorage
function renderCart() {
  cartList.innerHTML = ""; // Clear previous cart items
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });
}

// Function to add item to cart
function addToCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Find product by ID
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Add product to cart
  cart.push(product);

  // Update sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render cart
  renderCart();
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem("cart"); // Remove cart data
  renderCart(); // Update UI
}

// Attach event listener to Clear Cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
