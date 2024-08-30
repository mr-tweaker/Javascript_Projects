// DOM Elements
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const closeBtns = document.getElementsByClassName('close');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const addToCartBtns = document.querySelectorAll('.btn');

// Show modal function
function showModal(modal) {
    modal.style.display = 'block';
}

// Hide modal function
function hideModal(modal) {
    modal.style.display = 'none';
}

// Event Listeners
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(loginModal);
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(registerModal);
});

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal(loginModal);
    showModal(forgotPasswordModal);
});

// Close button functionality
Array.from(closeBtns).forEach(btn => {
    btn.addEventListener('click', () => {
        hideModal(btn.closest('.modal'));
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        hideModal(e.target);
    }
});

// Form submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    console.log('Login attempt:', { email, password });
    // Here you would typically send this data to your server
    alert('Login functionality to be implemented');
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    console.log('Registration attempt:', { username, email, password });
    // Here you would typically send this data to your server
    alert('Registration functionality to be implemented');
});

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    console.log('Password reset request for:', email);
    // Here you would typically send this data to your server
    alert('Password reset functionality to be implemented');
});

// Add to Cart functionality
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = e.target.closest('.product-card');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.price').textContent;
        console.log('Added to cart:', { productName, productPrice });
        // Here you would typically update the cart in your app's state
        alert(`${productName} added to cart`);
    });
});

// You may want to add more functionality here, such as:
// - Fetching product data from an API
// - Implementing a shopping cart
// - Handling user authentication state
// - Adding product search functionality