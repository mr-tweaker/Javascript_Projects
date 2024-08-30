// Placeholder for storing reviews
let productReviews = {};

function initializeRatingsAndReviews() {
    // Load reviews from localStorage if available
    const savedReviews = localStorage.getItem('productReviews');
    if (savedReviews) {
        productReviews = JSON.parse(savedReviews);
    }

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmission);
    }

    // Initial display of reviews
    displayReviews();
    updateAverageRating();
}

function handleReviewSubmission(e) {
    e.preventDefault();
    const rating = parseInt(document.getElementById('rating').value);
    const text = document.getElementById('review-text').value;
    const productId = getCurrentProductId(); // You need to implement this function

    if (!productReviews[productId]) {
        productReviews[productId] = [];
    }
    productReviews[productId].unshift({ rating, text });

    // Save to localStorage
    localStorage.setItem('productReviews', JSON.stringify(productReviews));

    displayReviews();
    updateAverageRating();
    e.target.reset();
}

function displayReviews() {
    const reviewList = document.getElementById('review-list');
    const productId = getCurrentProductId(); // You need to implement this function

    if (reviewList) {
        reviewList.innerHTML = '';
        const reviews = productReviews[productId] || [];
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <p>${review.text}</p>
            `;
            reviewList.appendChild(reviewElement);
        });
    }
}

function updateAverageRating() {
    const averageRatingElement = document.getElementById('average-rating');
    const starRatingElement = document.getElementById('star-rating');
    const productId = getCurrentProductId(); // You need to implement this function

    if (averageRatingElement && starRatingElement) {
        const reviews = productReviews[productId] || [];
        if (reviews.length === 0) {
            averageRatingElement.textContent = '0';
            starRatingElement.textContent = '☆☆☆☆☆';
            return;
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        averageRatingElement.textContent = averageRating.toFixed(1);
        starRatingElement.textContent = '★'.repeat(Math.round(averageRating)) + '☆'.repeat(5 - Math.round(averageRating));
    }
}

function getCurrentProductId() {
    // Implement this function to return the current product ID
    // For now, we'll return a placeholder ID
    return 'placeholder-id';
}

document.addEventListener('DOMContentLoaded', initializeRatingsAndReviews);