document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const totalItemsSpan = document.getElementById("total-items");
    const totalPriceSpan = document.getElementById("total-price"); // Update total price

    if (!cartContainer) {
        console.error("Element with ID 'cart-items' not found.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>🛒 Кошик порожній.</p>";
        totalItemsSpan.textContent = "0";
        totalPriceSpan.textContent = "$0.00";
        return;
    }

    cartContainer.innerHTML = ""; // Clear previous content

    let totalPrice = 0;

    cart.forEach((book, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        let price = book.price || 5; // Default price if not provided
        totalPrice += price;

        cartItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h3>${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p>💰 Price: $${price.toFixed(2)}</p>
                <label for="quantity-${index}">📦 Quantity:</label>
                <input type="number" id="quantity-${index}" class="cart-quantity" value="1" min="1" data-index="${index}" data-price="${price}">
                <button class="remove-btn" data-index="${index}">❌ Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    // Update summary
    totalItemsSpan.textContent = cart.length;
    totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;

    // Remove item functionality
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const bookIndex = event.target.getAttribute("data-index");
            removeFromCart(bookIndex);
        });
    });

    // Quantity change event
    document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("input", (event) => {
            updateTotal();
        });
    });
});

// Function to remove book from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload(); // Refresh page
}

// Function to update total price dynamically
function updateTotal() {
    let totalItems = 0;
    let totalPrice = 0;

    document.querySelectorAll(".cart-quantity").forEach(input => {
        let quantity = parseInt(input.value) || 1;
        let price = parseFloat(input.getAttribute("data-price"));
        totalItems += quantity;
        totalPrice += quantity * price;
    });

    document.getElementById("total-items").textContent = totalItems;
    document.getElementById("total-price").textContent = `$${totalPrice.toFixed(2)}`;
}
