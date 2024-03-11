document.addEventListener('DOMContentLoaded', function() {
    const searchTerm = localStorage.getItem('searchTerm');
    const forYouSection = document.querySelector('.for-you');

    if (searchTerm) {
        // Add a delay before searching
        setTimeout(() => {
            // Send a request to the server with the stored search term
            fetch(`http://localhost:3000/listings?search=${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    // Check if any items are found
                    if (data.length === 0) {
                        // If no items are found, display a message to the user
                        const listingsContainer = document.querySelector('.listings');
                        listingsContainer.innerHTML = '<p>No items found.</p>';
                    } else {
                        clearListings()
                        updateListings(data);
                        forYouSection.scrollIntoView({ behavior: 'smooth' });
                        localStorage.removeItem('searchTerm');
                        return
                    }
                })
                .catch(error => {
                    console.error('Error fetching listings:', error);
                    // Handle errors, show an error message to the user, etc.
                });
        }, 500); // Adjust delay time as needed
    } else {
        console.log('No search term stored.');
    }

    // Helper function to update the "For You" section with filtered items
    function updateListings(listings) {
        const listingsContainer = document.querySelector('.listings');
        listingsContainer.innerHTML = ''; // Clear existing listings

        listings.forEach(listing => {
            const listingElement = createListingElement(listing);
            listingsContainer.appendChild(listingElement);
        });
    }

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

document.addEventListener('DOMContentLoaded', function() {
    const browseDealsButton = document.querySelector('#browse-deals');
    const forYouSection = document.querySelector('.for-you');

    if (browseDealsButton && forYouSection) {
        browseDealsButton.addEventListener('click', function() {
            forYouSection.scrollIntoView({ behavior: 'smooth' });
        });
    } else {
        console.error('Button or for-you section not found.');
    }
});


document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const categoryId = category.querySelector('p').id;
        if (categoryId === 'all-categories') {
            clearListings()
            fetchListings(); // Call fetchListings function to show all listings
        } else {
            fetchListingsByCategory(categoryId); // Otherwise, fetch listings by category
        }
    });
});

function clearListings() {
    const listingsContainer = document.querySelector('.for-you .listings');
    listingsContainer.innerHTML = ''; // Clear existing listings
}

function fetchListingsByCategory(category) {
    fetch(`http://localhost:3000/listings?category=${category}`)
        .then(response => response.json())
        .then(data => {
            // Clear existing listings
            const listingsContainer = document.querySelector('.for-you .listings');
            listingsContainer.innerHTML = '';

            // Populate listings based on fetched data
            data.forEach(listing => {
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
                listingsContainer.appendChild(listingElement);
            });
        })
        .catch(error => console.error('Error fetching listings by category:', error));
}

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