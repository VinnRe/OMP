document.addEventListener('DOMContentLoaded', function() {
    const createListingButton = document.getElementById('create-listing-button');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userId = loggedInUser ? loggedInUser.userID : null;
    const imageInput = document.getElementById('item-images');
    const imagePreviewContainer = document.getElementById('image-preview');
    
    imageInput.addEventListener('change', function() {
        while (imagePreviewContainer.firstChild) {
            imagePreviewContainer.removeChild(imagePreviewContainer.firstChild);
        }

        const files = imageInput.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px'; // Adjust as needed
                img.style.marginRight = '10px'; // Adjust as needed
                imagePreviewContainer.appendChild(img);
            }

            reader.readAsDataURL(file);
        }
    });

    createListingButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Gather data from form fields
        const itemName = document.getElementById('item-name').value;
        const itemPrice = document.getElementById('item-price').value;
        const itemDescription = document.getElementById('item-details').value;
        const itemCategory = document.getElementById('item-category').value;

        // Create a JSON object with the data
        const listingData = {
            itemName: itemName,
            itemPrice: itemPrice,
            itemDescription: itemDescription,
            itemCategory: itemCategory,
            userID: userId
        };

        // Create a FormData object to send both files and listingData
        const formData = new FormData();
        formData.append('listingData', JSON.stringify(listingData));

        // Get the files from the file input
        const fileInput = document.getElementById('item-images');
        const files = fileInput.files;
        for (let i = 0; i < files.length; i++) {
            formData.append('item-images', files[i]);
        }

        // Send an HTTP POST request to the server
        fetch('http://localhost:3000/create-listing', {
            method: 'POST',
            body: formData,
            headers: {
                'user-id': loggedInUser.userID // Corrected the property name
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
                console.log('Success:', data);
                const popup = document.getElementById('popup');
                popup.style.display = 'block';

                setTimeout(() => {
                    popup.style.display = 'none';
                }, 3000);
        })
        .catch(error => {
            console.error('Error:', error);
            // Optionally, display an error message to the user
        });
    });
});
