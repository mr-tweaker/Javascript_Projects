// checkout.js

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function renderOrderSummary() {
        const orderItemsElement = document.getElementById('order-items');
        const orderTotalElement = document.getElementById('order-total');
        
        let total = 0;
        
        orderItemsElement.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="order-item">
                    <span>${item.name} x ${item.quantity}</span>
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

    renderOrderSummary();

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