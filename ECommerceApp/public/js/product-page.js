// product-page.js

const products = [
    { id: 1, name: "Men's T-Shirt", category: "men", price: 19.99, image: "/api/placeholder/250/250" },
    { id: 2, name: "Men's Jeans", category: "men", price: 49.99, image: "/api/placeholder/250/250" },
    { id: 3, name: "Women's Blouse", category: "women", price: 29.99, image: "/api/placeholder/250/250" },
    { id: 4, name: "Women's Skirt", category: "women", price: 39.99, image: "/api/placeholder/250/250" },
    { id: 5, name: "Kids' T-Shirt", category: "kids", price: 14.99, image: "/api/placeholder/250/250" },
    { id: 6, name: "Kids' Shorts", category: "kids", price: 24.99, image: "/api/placeholder/250/250" },
    { id: 7, name: "Men's Sweater", category: "men", price: 59.99, image: "/api/placeholder/250/250" },
    { id: 8, name: "Women's Dress", category: "women", price: 69.99, image: "/api/placeholder/250/250" },
    { id: 9, name: "Kids' Jacket", category: "kids", price: 34.99, image: "/api/placeholder/250/250" },
];

let cart = {};
let currentCategory = 'all';
let searchTerm = '';
let currentSortOrder = 'none';
let productReviews = {};

function displayProducts(category = 'all', search = '', sortOrder = 'none') {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    let filteredProducts = products;

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchLower) || 
            product.category.toLowerCase().includes(searchLower)
        );
    }

    if (sortOrder === 'lowToHigh') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p>No products found.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            <div class="ratings-reviews" id="ratings-reviews-${product.id}">
                <h4>Ratings & Reviews</h4>
                <div class="average-rating">
                    <span id="average-rating-${product.id}">0</span>/5
                    <span id="star-rating-${product.id}">☆☆☆☆☆</span>
                </div>
                <div id="review-list-${product.id}" class="review-list"></div>
                <button class="show-review-form-btn" data-id="${product.id}">Write a Review</button>
            </div>
        `;
        productGrid.appendChild(productCard);

        updateProductReviews(product.id);
    });

    document.querySelectorAll('.show-review-form-btn').forEach(btn => {
        btn.addEventListener('click', showReviewForm);
    });
}

function initializeEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            displayProducts(currentCategory, searchTerm, currentSortOrder);
        });
    });

    document.getElementById('product-grid').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(event.target.dataset.id);
            addToCart(productId, event.target);
        }
    });

    document.getElementById('cart-button').addEventListener('click', () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = '/public/checkout.html';
    });

    document.getElementById('clear-cart-button').addEventListener('click', () => {
        clearCart();
    });

    document.getElementById('search-input').addEventListener('input', (event) => {
        searchTerm = event.target.value;
        displayProducts(currentCategory, searchTerm, currentSortOrder);
    });

    document.getElementById('sort-select').addEventListener('change', (event) => {
        currentSortOrder = event.target.value;
        displayProducts(currentCategory, searchTerm, currentSortOrder);
    });
}

function addToCart(productId, button) {
    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }
    updateCartCount();
    showAddToCartAnimation(button);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
    cartCount.textContent = totalItems;
}

function showAddToCartAnimation(button) {
    button.classList.add('added');
    button.textContent = 'Added!';
    setTimeout(() => {
        button.classList.remove('added');
        button.textContent = 'Add to Cart';
    }, 2000);
}

function clearCart() {
    cart = {};
    updateCartCount();
    localStorage.removeItem('cart');
    showClearCartAnimation();
}

function showClearCartAnimation() {
    const clearButton = document.getElementById('clear-cart-button');
    clearButton.textContent = 'Cleared!';
    setTimeout(() => {
        clearButton.textContent = 'Clear Cart';
    }, 2000);
}

// New functions for ratings and reviews

function showReviewForm(event) {
    const productId = event.target.dataset.id;
    const reviewForm = document.createElement('div');
    reviewForm.innerHTML = `
        <form id="review-form-${productId}" class="review-form">
            <select id="rating-${productId}" required>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
            </select>
            <textarea id="review-text-${productId}" required></textarea>
            <button type="submit">Submit Review</button>
        </form>
    `;
    event.target.parentNode.appendChild(reviewForm);
    event.target.style.display = 'none';

    document.getElementById(`review-form-${productId}`).addEventListener('submit', handleReviewSubmission);
}

function handleReviewSubmission(e) {
    e.preventDefault();
    const productId = e.target.id.split('-')[2];
    const rating = parseInt(document.getElementById(`rating-${productId}`).value);
    const text = document.getElementById(`review-text-${productId}`).value;

    if (!productReviews[productId]) {
        productReviews[productId] = [];
    }
    productReviews[productId].unshift({ rating, text });

    localStorage.setItem('productReviews', JSON.stringify(productReviews));

    updateProductReviews(productId);
    e.target.reset();
    e.target.style.display = 'none';
    document.querySelector(`.show-review-form-btn[data-id="${productId}"]`).style.display = 'block';
}

function updateProductReviews(productId) {
    const reviews = productReviews[productId] || [];
    const reviewList = document.getElementById(`review-list-${productId}`);
    const averageRatingElement = document.getElementById(`average-rating-${productId}`);
    const starRatingElement = document.getElementById(`star-rating-${productId}`);

    reviewList.innerHTML = '';
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p>${review.text}</p>
        `;
        reviewList.appendChild(reviewElement);
    });

    if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        averageRatingElement.textContent = averageRating.toFixed(1);
        starRatingElement.textContent = '★'.repeat(Math.round(averageRating)) + '☆'.repeat(5 - Math.round(averageRating));
    } else {
        averageRatingElement.textContent = '0';
        starRatingElement.textContent = '☆☆☆☆☆';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    initializeEventListeners();

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();

    const savedReviews = localStorage.getItem('productReviews');
    if (savedReviews) {
        productReviews = JSON.parse(savedReviews);
    }
});