document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch the logged-in user's cart data
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userId = loggedInUser ? loggedInUser.userID : null;
    
    function getCartData() {
        fetch('http://localhost:3000/userCart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-id': userId
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cart data:', data); // Log the received cart data
            // Update the cart section with the user's cart data
            updateCart(data);
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
            // Handle errors
        });
    }

    // Function to update the cart section of the HTML
    function updateCart(cartData) {
        const cartList = document.getElementById('cart-items');
    
        // Clear existing cart items
        cartList.innerHTML = '';
    
        if (Array.isArray(cartData.user) && cartData.user.length > 0) {
            // Display each cart item
            cartData.user.forEach(item => {
                // Create cart item element
                const cartItemElement = createCartItemElement(item);
                // Append cart item element to the cart list
                cartList.appendChild(cartItemElement);
            });
        } else {
            // Display a message if the cart is empty
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Your cart is empty.';
            cartList.appendChild(emptyCartMessage);
        }
    }    

    function createCartItemElement(item) {
        const listItem = document.createElement('div');
        listItem.classList.add('cart-item');
    
        listItem.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.imagePath}" alt="${item.itemName}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.itemName}</h3>
                    <p class="cart-item-price">₱ ${item.itemPrice}</p>
                </div>
            </div>
        `;
    
        return listItem;
    }        

    // Fetch the cart data when the page loads
    getCartData();
});
