document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
  });
  
  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="/api/placeholder/250/250" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <a href="#" class="btn" onclick="addToCart(${product.id})">Add to Cart</a>
      </div>
    `).join('');
  }
  
  function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    // Implement cart functionality here
  }