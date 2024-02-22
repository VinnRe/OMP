const signup = document.querySelector('.t-signup');
const login = document.querySelector('.t-login');
const loginSignupPage = document.querySelector('.login-signup--page');

signup.addEventListener('click', function() {
    console.log("Signup link clicked");
    loginSignupPage.classList.remove('login-show');
    loginSignupPage.classList.add('signup-show');
});

login.addEventListener('click', function() {
    console.log("Login link clicked");
    loginSignupPage.classList.remove('signup-show');
    loginSignupPage.classList.add('login-show');
});