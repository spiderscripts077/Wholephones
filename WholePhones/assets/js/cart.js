// Universal cart functions used on multiple pages
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCartItems(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = 'cart-row';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;margin-right:8px;vertical-align:middle;">
      <strong style="vertical-align:middle;">${item.name}</strong> – ${item.color}, ${item.storage} – ${item.price}
      <button onclick="removeItem(${index})" class="btn" style="margin-left:10px;">Remove</button>
    `;
    container.appendChild(div);
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function goToCheckout() {
  window.location.href = "checkout.html";
}

function updateTopCart() {
  // Re-read cart from localStorage in case it changed elsewhere
  const current = JSON.parse(localStorage.getItem('cart')) || [];
  const top = document.getElementById('top-cart-items');
  if (top) {
    top.textContent = `Cart: ${current.length} item${current.length !== 1 ? 's' : ''}`;
  }
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = current.length;
    // hide badge when zero for a cleaner look
    badge.style.display = current.length > 0 ? 'inline-block' : 'none';
  }
}

// Auto-render if specific containers are present
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-items')) {
    renderCartItems('cart-items');
  }
  if (document.getElementById('top-cart-items')) {
    updateTopCart();
  }
  // Always attempt to update the cart badge if present
  updateTopCart();
});

// Expose functions to global scope for inline onclick handlers
window.removeItem = removeItem;
window.goToCheckout = goToCheckout;
window.updateTopCart = updateTopCart;
