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
                    <div class="listedItem">
                        <div class="image-container">
                            <div class="scrollable-images">
                                ${listingImages(listing.images)} <!-- Dynamically insert images -->
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
                    <!-- Add more elements as needed -->
                `;
                listingsContainer.appendChild(listingElement);
            });

            // Add event listeners to each listing for image navigation
            document.querySelectorAll('.listing').forEach(listing => {
                const prevButton = listing.querySelector('.prev-btn');
                const nextButton = listing.querySelector('.next-btn');
                const imageContainer = listing.querySelector('.scrollable-images');
                const images = imageContainer.querySelectorAll('img');
                let currentImageIndex = 0;

                // Function to scroll to the previous image
                prevButton.addEventListener('click', function() {
                    images[currentImageIndex].style.display = 'none'; // Hide current image
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; // Loop around
                    images[currentImageIndex].style.display = 'inline-block'; // Show previous image
                });

                // Function to scroll to the next image
                nextButton.addEventListener('click', function() {
                    images[currentImageIndex].style.display = 'none'; // Hide current image
                    currentImageIndex = (currentImageIndex + 1) % images.length; // Loop around
                    images[currentImageIndex].style.display = 'inline-block'; // Show next image
                });
            });
        })
        .catch(error => console.error('Error fetching listings:', error));
}

// Function to generate HTML for listing images
function listingImages(images) {
    if (!images || images.length === 0) return ''; // Return empty string if no images
    // Display all images
    return images.map(image => `<img src="${image}" alt="Listing Image">`).join('');
}

// Call the fetchListings function when the page loads
window.addEventListener('load', fetchListings);