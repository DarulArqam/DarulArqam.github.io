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

    // Save user information to local storage (for demonstration purposes)
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('hasSignedUp', true);

    // Redirect to signup success page
    window.location.href = 'signup.html';
}

function validateLogin() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const loginErrorMessage = document.getElementById('loginErrorMessage');

    // Retrieve user information from local storage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Simple validation: Check if entered credentials match stored credentials
    if (loginUsername === storedUsername && loginPassword === storedPassword) {
        // Redirect to login success page
        alert(`Login successful! Hello ${storedUsername}. Redirecting...`);
        window.location.href = 'login-success.html';
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

function redirectToSignUp() {
    // Redirect to the signup page
    window.location.href = 'index.html';
}
