document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function() {
        const searchBar = document.getElementById('search-bar');
        const searchTerm = searchBar.value.trim();

        // Send a request to the server with the search term
        fetch(`http://localhost:3000/listings?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Clear existing listings
                const listingsContainer = document.querySelector('.listings');
                listingsContainer.innerHTML = '';

                // Check if any items are found
                if (data.length === 0) {
                    listingsContainer.innerHTML = '<p>No items found.</p>';
                    return;
                }

                // Append filtered items to the "For You" section
                data.forEach(listing => {
                    const listingElement = createListingElement(listing);
                    listingsContainer.appendChild(listingElement);
                });
            })
            .catch(error => {
                console.error('Error fetching listings:', error);
                // Handle errors, show an error message to the user, etc.
            });
    });

    // Helper function to create listing elements
    function createListingElement(listing) {
        const listingElement = document.createElement('div');
        listingElement.classList.add('listing');
        listingElement.innerHTML = `
            <div class="listedItem">
                <div class="image-container">
                    <div class="scrollable-images">
                        ${listingImages(listing.images)}
                    </div>
                </div>
                <div class="btn-container">
                    <button class="prev-btn">&lt;</button>
                    <button class="next-btn">&gt;</button>
                </div>
                <h3>${listing.itemName}</h3>
                <p>₱ ${listing.itemPrice}</p>
                <p class="item-details">${listing.itemDescription}</p>
                <button class='buy-btn'>Add to Cart</button>
            </div>
        `;
        return listingElement;
    }
});
