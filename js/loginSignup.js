document.addEventListener("DOMContentLoaded", function(){
    const signupLink = document.querySelector('.t-signup');
    const loginLink = document.querySelector('.t-login');
    const loginSection = document.querySelector('.login');
    const signupSection = document.querySelector('.signup');

    signupSection.style.display = 'none';

    signupLink.addEventListener('click', function(event){
        event.preventDefault()
        loginSection.style.display = 'none';
        signupSection.style.display = 'flex';
    })

    loginLink.addEventListener('click', function(event){
        event.preventDefault()
        loginSection.style.display = 'flex';
        signupSection.style.display = 'none';
    })

    const rememberMeCheckBox = document.getElementById('rmbr--l')
    const storedEmail = localStorage.getItem('loginEmail')
    const storedPassword = localStorage.getItem('loginPassword')
    if (storedEmail && storedPassword) {
        document.getElementById('loginEmail').value = storedEmail;
        document.getElementById('loginPassword').value = storedPassword;
        rememberMeCheckbox.checked = true;
    }

    function handleLogin(email, password) {
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => {
          if(response.ok) {
              console.log("LOGGED IN")
              return response.json()
          } else {
              console.log("Log in failed")
          }
      })
      .then(data => {
          // Set to logged in state
          console.log(data)
          localStorage.setItem('loggedInUser', JSON.stringify(data.user))

          // Switch to home
          window.location.href = '/index.html'
      })
      .catch(error => {
          console.error('Error:', error)
          // Handle other errors
      })
    }

    // LOGIN HANDLER
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const email = document.getElementById('loginEmail').value
        const password = document.getElementById('loginPassword').value
        const rememberMe = rememberMeCheckBox.checked

        if (rememberMe) {
            localStorage.setItem('loginEmail', email)
            localStorage.setItem('loginPassword', password)
        } else {
            localStorage.removeItem('loginEmail')
            localStorage.removeItem('loginPassword')
        }
    
        handleLogin(email, password)
    })
    
    // SIGNUP HANDLER
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const repassword = document.getElementById('signupRepassword').value
        
        if(password != repassword || repassword != password) {
            console.log('PASSWORDS DONT MATCH')
        }
    
        fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        })
        .then(response => {
          if (response.ok) {
            // Signup successful, redirect or show success message
            console.log('Signup successful');
            handleLogin(email, password)
          } else {
            // Signup failed, display error message
            response.json().then(data => {
              console.error('Signup failed:', data.error);
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle other errors
        });
      });
});
