document.addEventListener('DOMContentLoaded', function() {
  const createListingButton = document.getElementById('create-listing-button');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const userId = loggedInUser ? loggedInUser.userID : null;

  createListingButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default form submission

      // Gather data from form fields
      const itemName = document.getElementById('item-name').value;
      const itemPrice = document.getElementById('item-price').value;
      const itemDescription = document.getElementById('item-details').value;

      // Create a JSON object with the data
      const listingData = {
          itemName: itemName,
          itemPrice: itemPrice,
          itemDescription: itemDescription,
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
          // Optionally, display a success message or redirect to another page
      })
      .catch(error => {
          console.error('Error:', error);
          // Optionally, display an error message to the user
      });
  });
});
