// shopping-cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [
    { id: 1, name: "Product 1", price: 19.99, quantity: 2 },
    { id: 2, name: "Product 2", price: 29.99, quantity: 1 },
    { id: 3, name: "Product 3", price: 39.99, quantity: 3 },
];

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
            <img src="/api/placeholder/80/80" alt="${item.name}">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <button class="remove-btn" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    updateCartSummary();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeItem(id);
        } else {
            renderCart();
        }
    }
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();

    document.getElementById("cart-items").addEventListener("click", (e) => {
        if (e.target.classList.contains("quantity-btn")) {
            const id = parseInt(e.target.dataset.id);
            const change = e.target.classList.contains("plus") ? 1 : -1;
            updateQuantity(id, change);
        } else if (e.target.classList.contains("remove-btn") || e.target.closest(".remove-btn")) {
            const id = parseInt(e.target.closest(".remove-btn").dataset.id);
            removeItem(id);
        }
    });

    document.getElementById("checkout-btn").addEventListener("click", () => {
        window.location.href = '/checkout.html';
    });
});