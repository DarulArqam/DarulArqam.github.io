// admin.js
window.onload = displayUserData;

function displayUserData() {
    const container = document.querySelector('.container');

    // Loop through all users in Firebase
    database.ref('users').once('value').then(function(snapshot) {
        snapshot.forEach(function(userSnapshot) {
            const userData = userSnapshot.val();

            // Display user data
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `<p>${userData.username} - ${userData.email} 
                                 ${userData.isAdmin ? '(Admin)' : ''}</p>`;
            
            // Add button to view and edit user's portfolio
            const viewPortfolioBtn = document.createElement('button');
            viewPortfolioBtn.textContent = 'View/Edit Portfolio';
            viewPortfolioBtn.onclick = function () {
                // Redirect to portfolio.html with the username as a parameter
                window.location.href = `portfolio.html?user=${userData.username}`;
            };
            userDiv.appendChild(viewPortfolioBtn);

            container.appendChild(userDiv);
        });
    });
}
