function validateForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Simple validation: Check if fields are not empty
    if (!username.trim() || !email.trim() || !password.trim()) {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }

    // Simulate successful signup (you would replace this with actual server-side logic)
    alert(`Sign up successful!\nUsername: ${username}\nEmail: ${email}`);

    // Clear form fields and error message
    document.getElementById('signupForm').reset();
    errorMessage.textContent = '';
}
