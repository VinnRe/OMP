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

});