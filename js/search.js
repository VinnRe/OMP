document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function() {
        const searchBar = document.getElementById('search-bar');
        const searchTerm = searchBar.value.trim();

        // Store the searched term in localStorage
        localStorage.setItem('searchTerm', searchTerm);

        // Redirect to index.html
        window.location.href = 'index.html';
    });
});
