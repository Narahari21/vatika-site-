// Run after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const productList = document.querySelectorAll('.add-to-cart');

  if (productList) {
    productList.forEach(button => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart!`);
      });
    });
  }

  // Filter functionality
  const filterSelect = document.getElementById('categoryFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      const selected = filterSelect.value;
      document.querySelectorAll('.product-card').forEach(card => {
        const category = card.getAttribute('data-category');
        if (selected === 'all' || category === selected) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Search functionality
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      document.querySelectorAll('.product-card').forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(searchTerm) ? 'block' : 'none';
      });
    });
  }

  // Load cart page
  const cartSection = document.querySelector('.cart-section');
  if (cartSection && window.location.pathname.includes('cart.html')) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemList = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Price: ₹${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <p>₹${item.price * item.quantity}</p>
      </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartSection.innerHTML = `
      <h2>Your Shopping Cart</h2>
      ${itemList || '<p>Your cart is empty.</p>'}
      <div class="cart-total">Total: ₹${total}</div>
      <button class="checkout-btn">Proceed to Checkout</button>
    `;
  }
});
