// Function to fetch listings from the server
function fetchListings() {
    fetch('http://localhost:3000/listings') // Assuming your server is running on localhost:3000
        .then(response => response.json())
        .then(data => {
            // Populate the "For You" section with the fetched listings
            const listingsContainer = document.querySelector('.for-you .listings');
            data.forEach(listing => {
                const listingElement = document.createElement('div');
                listingElement.classList.add('listing');
                listingElement.innerHTML = `
                    <h3>${listing.itemName}</h3>
                    <p>${listing.itemPrice}</p>
                    <p>${listing.itemDescription}</p>
                    <!-- Add more elements as needed -->
                `;
                listingsContainer.appendChild(listingElement);
            });
        })
        .catch(error => console.error('Error fetching listings:', error));
}

// Call the fetchListings function when the page loads
window.addEventListener('load', fetchListings);
