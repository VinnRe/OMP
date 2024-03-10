document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userId = loggedInUser ? loggedInUser.userID : null;
    fetch('http://localhost:3000/getLoggedInUser', {
        headers: {
            'Content-Type': 'application/json',
            'user-id': userId // Pass the user ID as the value of the 'user-id' header
        }
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch user data');
            }
        })
        .then(loggedInUser => {
            const notLoggedDiv = document.getElementById('notLogged');
            const accSettingsDiv = document.getElementById('acc-settings');

            if (loggedInUser) {
                accSettingsDiv.style.display = 'block';
                notLoggedDiv.style.display = 'none';

                const username = loggedInUser.userName || 'User';
                const email = loggedInUser.email || 'Email not provided';
                const address = loggedInUser.address || 'Address not provided';

                document.querySelector('.acc-username').textContent =` ${username}`;
                document.querySelector('.acc-email').textContent = `Email: ${email}`;
                document.querySelector('.acc-address').textContent = `Address: ${address}`;
            } else {
                accSettingsDiv.style.display = 'none';
                notLoggedDiv.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    document.getElementById('logoutButton').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('loggedInUser');
        console.log("LOGGED OUT");

        const notLoggedDiv = document.getElementById('notLogged');
        const accSettingsDiv = document.getElementById('acc-settings');
        accSettingsDiv.style.display = 'none';
        notLoggedDiv.style.display = 'block';
    });
   
    document.getElementById('updateUserNameButton').addEventListener('click', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('editUsername').value;
    
        fetch('http://localhost:3000/updateUsername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': loggedInUser.userID
            },
            body: JSON.stringify({ username: newUsername })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update username');
            }
        })
        .then(data => {
            // Update UI with new username
            document.querySelector('.acc-username').textContent = newUsername;
            console.log('Username updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating username:', error);
        });
    });    

    document.getElementById('updateEmailButton').addEventListener('click', function(event) {
        event.preventDefault();
        const newEmail = document.getElementById('editEmail').value;
    
        fetch('http://localhost:3000/updateEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': loggedInUser.userID
            },
            body: JSON.stringify({ email: newEmail })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update email');
            }
        })
        .then(data => {
            // Update UI with new email
            document.querySelector('.acc-email').textContent = `Email: ${newEmail}`;
            console.log('Email updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating email:', error);
        });
    });
    
    document.getElementById('updateAddressButton').addEventListener('click', function(event) {
        event.preventDefault();
        const newAddress = document.getElementById('editAddress').value;

        fetch('http://localhost:3000/updateAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': loggedInUser.userID
            },
            body: JSON.stringify({ address: newAddress })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update address');
            }
        })
        .then(data => {
            // Update UI with new address
            document.querySelector('.acc-address').textContent = `Address: ${newAddress}`;
            console.log('Address updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating address:', error);
        });
    });

    document.getElementById('updatePassButton').addEventListener('click', function(event) {
        event.preventDefault();
        const newPassword = document.getElementById('editPassword').value;

        fetch('http://localhost:3000/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': loggedInUser.userID
            },
            body: JSON.stringify({ password: newPassword })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update password');
            }
        })
        .then(data => {
            // Update UI with success message or handle as needed
            console.log('Password updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating password:', error);
        });
    });

});
