// Import the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLOuU9mrcuvp7uJdS0IvSjzyMIGNRITiw",
    authDomain: "darularqam-777.firebaseapp.com",
    databaseURL: "https://darularqam-777-default-rtdb.firebaseio.com",
    projectId: "darularqam-777",
    storageBucket: "darularqam-777.appspot.com",
    messagingSenderId: "987048312565",
    appId: "1:987048312565:web:d2c7b24f21b4e5ae6f0fbc",
    measurementId: "G-HEN74K4WFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// Check if the user has signed up
const userId = getUserId(); // Assuming you have a function to get the user ID
const hasSignedUp = await checkIfUserSignedUp(userId);

async function checkIfUserSignedUp(userId) {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.exists();
}

// Function to get the user ID from Firebase Authentication
function getUserId() {
    const user = auth.currentUser;
    return user ? user.uid : null;
}

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

    // Create user in Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Save user information to Firebase Realtime Database
            const userId = userCredential.user.uid;
            saveUserDataToDatabase(userId, username, email, password);

            // Redirect to signup success page
            window.location.href = `portfolio_${username}.html`;
        })
        .catch((error) => {
            errorMessage.textContent = error.message;
        });
}

function validateLogin() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const loginErrorMessage = document.getElementById('loginErrorMessage');

    // Retrieve user information from Firebase Realtime Database
    getUserDataFromDatabase(loginUsername)
        .then(userData => {
            // Simple validation: Check if entered credentials match stored credentials
            if (userData && loginPassword === userData.password) {
                // Redirect to login success page
                alert(`Login successful! Hello ${loginUsername}. Redirecting...`);
                window.location.href = `portfolio_${loginUsername}.html`;
            } else {
                loginErrorMessage.textContent = 'Invalid username or password. Please try again.';
            }
        });
}

// Function to get user data from Firebase Realtime Database
async function getUserDataFromDatabase(username) {
    const userRef = firebase.database().ref(`users/${username}`);
    const snapshot = await userRef.once('value');

    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null;
    }
}

function saveUserDataToDatabase(userId, username, email, password) {
    // Save user information to Firebase Realtime Database
    const userRef = firebase.database().ref(`users/${username}`);
    userRef.set({
        username: username,
        email: email,
        password: password,
        isAdmin: false
    });
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
