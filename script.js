// Check if the user has signed up
const hasSignedUp = localStorage.getItem('hasSignedUp');

// Display the appropriate form based on whether the user has signed up
if (hasSignedUp) {
    showLogin();
} else {
    showSignUp();
}

function validateSignUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Simple validation: Check if fields are not empty
    if (!username.trim() || !email.trim() || !password.trim()) {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }

    // Create user object
    const user = {
        username: username,
        email: email,
        password: password,
        isAdmin: false // Set isAdmin to false initially
    };

    // Save user information to local storage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('hasSignedUp', true);

    // Redirect to signup success page
    window.location.href = 'signup.html';
}

function validateLogin() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const loginErrorMessage = document.getElementById('loginErrorMessage');

    // Retrieve user information from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Simple validation: Check if entered credentials match stored credentials
    if (storedUser && loginUsername === storedUser.username && loginPassword === storedUser.password) {
        // Redirect to login success page
        alert(`Login successful! Hello ${storedUser.username}. Redirecting...`);
        window.location.href = 'portfolio.html';
    } else {
        loginErrorMessage.textContent = 'Invalid username or password. Please try again.';
    }
}

function showLogin() {
    document.getElementById('authForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loginErrorMessage').textContent = '';
}

function showSignUp() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('authForm').classList.remove('hidden');
    document.getElementById('errorMessage').textContent = '';
}

function displayPortfolioGreeting() {
    // Retrieve the username from local storage (you may need to modify this based on your authentication flow)
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the username is available
    if (storedUser && storedUser.username) {
        // Update the placeholder with the username
        document.getElementById('usernamePlaceholder').innerText = storedUser.username;
    } else {
        // If username is not available, redirect to the login page
        window.location.href = 'index.html';
    }
}

// Call the function when the portfolio page loads
window.onload = displayPortfolioGreeting;

function redirectToSignUp() {
    // Redirect to the signup page
    window.location.href = 'index.html';
}

function makeUserAdmin(username) {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username) {
        storedUser.isAdmin = true;
        localStorage.setItem('user', JSON.stringify(storedUser));
        console.log(`${username} is now an admin!`);
    } else {
        console.error(`${username} not found in localStorage.`);
    }
}

// Call the function with the desired username to make them an admin
makeUserAdmin('Yoosif');

function checkAdminStatus(username) {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.isAdmin) {
        return true; // User is an admin
    } else {
        return false; // User is not an admin
    }
}
