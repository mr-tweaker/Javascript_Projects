// checkout.js

document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    
    function loadCart() {
        const cartData = localStorage.getItem('cart');
        console.log('Raw cart data:', cartData);
        
        if (cartData) {
            try {
                cart = JSON.parse(cartData);
                console.log('Parsed cart data:', cart);
                
                // Check if cart is an object (key-value pairs) instead of an array
                if (!Array.isArray(cart)) {
                    cart = Object.entries(cart).map(([id, quantity]) => ({
                        id: parseInt(id),
                        quantity,
                        // Note: We don't have product details here, so we'll need to fetch them
                    }));
                }
            } catch (error) {
                console.error('Error parsing cart data:', error);
                cart = [];
            }
        } else {
            console.log('No cart data found in localStorage');
        }
    }

    function fetchProductDetails() {
        // This is a placeholder. In a real application, you'd fetch this from your server or have it in your JavaScript.
        return [
            { id: 1, name: "Men's T-Shirt", price: 19.99 },
            { id: 2, name: "Men's Jeans", price: 49.99 },
            { id: 3, name: "Women's Blouse", price: 29.99 },
            { id: 4, name: "Women's Skirt", price: 39.99 },
            { id: 5, name: "Kids' T-Shirt", price: 14.99 },
            { id: 6, name: "Kids' Shorts", price: 24.99 },
            { id: 7, name: "Men's Sweater", price: 59.99 },
            { id: 8, name: "Women's Dress", price: 69.99 },
            { id: 9, name: "Kids' Jacket", price: 34.99 },
        ];
    }
    
    function renderOrderSummary() {
        const orderItemsElement = document.getElementById('order-items');
        const orderTotalElement = document.getElementById('order-total');
        
        let total = 0;
        const products = fetchProductDetails();
        
        orderItemsElement.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) {
                console.error(`Product not found for id: ${item.id}`);
                return '';
            }
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            return `
                <div class="order-item">
                    <span>${product.name} x ${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            `;
        }).join('');
        
        const tax = total * 0.1;
        const grandTotal = total + tax;
        
        orderTotalElement.innerHTML = `
            <div class="order-total-line">
                <span>Subtotal:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="order-total-line">
                <span>Tax (10%):</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="order-total-line total">
                <span>Total:</span>
                <span>$${grandTotal.toFixed(2)}</span>
            </div>
        `;
    }

    function handleStorageChange(event) {
        if (event.key === 'cart') {
            console.log('Cart updated in another tab');
            loadCart();
            renderOrderSummary();
        }
    }

    loadCart();
    renderOrderSummary();

    // Listen for changes in localStorage
    window.addEventListener('storage', handleStorageChange);

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your server
        alert('Order placed successfully! (This is where you would process the payment and send order details to your server)');
        // Clear the cart after successful order
        localStorage.removeItem('cart');
        // Redirect to a thank you page or back to the home page
        window.location.href = '/';
    });
});