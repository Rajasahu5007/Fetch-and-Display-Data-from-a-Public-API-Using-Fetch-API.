const userContainer = document.getElementById('userContainer');
const message = document.getElementById('message');
const reloadBtn = document.getElementById('reloadBtn');
const loadingSpinner = document.getElementById('loadingSpinner');

async function fetchUsers() {
    message.textContent = '';
    userContainer.innerHTML = '';
    loadingSpinner.style.display = 'block';

    try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        const users = data.results;

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('userCard');

            userCard.innerHTML = `
                <img src="${user.picture.medium}" alt="${user.name.first}">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
            `;

            userContainer.appendChild(userCard);
        });
    } catch (error) {
        message.textContent = `Error: ${error.message}`;
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

reloadBtn.addEventListener('click', fetchUsers);
fetchUsers();
