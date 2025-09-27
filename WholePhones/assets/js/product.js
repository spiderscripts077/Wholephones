const products = {
  iphone13: {
    name: "iPhone 13",
    price: "$299",
    originalPrice: "$599",
    condition: "Excellent",
    image: "assets/images/iphone13.jpg",
  description: "Mint condition — fully inspected, professionally cleaned, and tested. Ships with the original-style accessories (charger, cable, and official packaging). Buy confidently with our limited warranty and fast, tracked shipping."
    ,
    features: ["Battery health: 95%+", "Unlocked and ready", "Includes original-style charger & cable", "Mint cosmetic condition"]
  },
  iphone14: {
    name: "iPhone 14",
    price: "$349",
    originalPrice: "$699",
    condition: "Like New",
    image: "assets/images/iphone14.jpg",
  description: "Mint condition — fully inspected, professionally cleaned, and tested. Ships with the original-style accessories (charger, cable, and official packaging). Buy confidently with our limited warranty and fast, tracked shipping."
    ,
    features: ["Battery health: 96%+", "Unlocked and ready", "Includes original-style charger & cable", "Mint cosmetic condition"]
  }
};

// Add remaining products
products.iphone15 = {
  name: "iPhone 15",
  price: "$399",
  originalPrice: "$799",
  condition: "Like New",
  image: "assets/images/iphone15.jpg",
  description: "Mint condition — fully inspected, professionally cleaned, and tested. Ships with the original-style accessories (charger, cable, and official packaging). Buy confidently with our limited warranty and fast, tracked shipping."
  ,
  features: ["Battery health: 96%+", "Carrier unlocked", "Includes original-style charger & cable", "Mint cosmetic condition"]
};
products.iphone16 = {
  name: "iPhone 16",
  price: "$449",
  originalPrice: "$899",
  condition: "Excellent",
  image: "assets/images/iphone16.jpg",
  description: "Mint condition — fully inspected, professionally cleaned, and tested. Ships with the original-style accessories (charger, cable, and official packaging). Buy confidently with our limited warranty and fast, tracked shipping."
  ,
  features: ["Battery health: 97%+", "Carrier unlocked", "Includes original-style charger & cable", "Mint cosmetic condition"]
};
products.iphone17 = {
  name: "iPhone 17",
  price: "$499",
  originalPrice: "$999",
  condition: "Brand New",
  image: "assets/images/iphone17.jpg",
  description: "Mint condition — fully inspected, professionally cleaned, and tested. Ships with the original-style accessories (charger, cable, and official packaging). Buy confidently with our limited warranty and fast, tracked shipping."
  ,
  features: ["Battery health: 100%", "Factory unlocked", "Includes original accessories & packaging", "Brand-new grade finish"]
};

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (products[productId]) {
  const product = products[productId];
  document.getElementById("product-name").textContent = product.name;
  // Set prices (original + discounted)
  const origEl = document.getElementById('original-price');
  const discEl = document.getElementById('discounted-price');
  if (origEl && discEl) {
    origEl.textContent = product.originalPrice || '';
    discEl.textContent = product.price || '';
  }
  document.getElementById("product-condition").textContent = `Condition: ${product.condition}`;
  document.getElementById("product-image").src = product.image;
  if (product.description && document.getElementById('product-description')) {
    document.getElementById('product-description').textContent = product.description;
  }
  // Render features list
  if (product.features && document.getElementById('product-details-list')) {
    const list = document.getElementById('product-details-list');
    list.innerHTML = '';
    product.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      list.appendChild(li);
    });
  }
}

function addToCart() {
  const color = document.getElementById('colorSelect').value;
  const storage = document.getElementById('storageSelect').value;
  const product = products[productId];
  if (!product) {
    alert('No product selected');
    return;
  }
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({
    id: productId,
    name: product.name,
    price: product.price,
    color,
    storage,
    image: product.image
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}

// Helper: get selected value from option-tabs container
function getSelectedOption(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return null;
  const active = container.querySelector('.option-tab.active');
  return active ? active.getAttribute('data-value') : null;
}

// Initialize option tab handlers
document.addEventListener('DOMContentLoaded', () => {
  ['colorSelect', 'storageSelect'].forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;
    // Click and keyboard handling
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.option-tab');
      if (!btn) return;
      // remove active from siblings
      container.querySelectorAll('.option-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      if (window.updateTopCart) window.updateTopCart();
    });
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const btn = e.target.closest('.option-tab');
        if (btn) btn.click();
      }
    });
  });

  // Info tab toggles
  document.querySelectorAll('.info-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.info-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      const content = document.getElementById(target);
      if (content) content.classList.remove('hidden');
    });
  });
});

// Update addToCart to use new option-tab selection
const originalAddToCart = addToCart;
addToCart = function() {
  const color = getSelectedOption('colorSelect') || 'Default';
  const storage = getSelectedOption('storageSelect') || 'Default';
  const product = products[productId];
  if (!product) {
    alert('No product selected');
    return;
  }
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({
    id: productId,
    name: product.name,
    price: product.price,
    color,
    storage,
    image: product.image
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  if (window.updateTopCart) window.updateTopCart();
  alert('Product added to cart!');
};
