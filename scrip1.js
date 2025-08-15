const userContainer = document.getElementById('userContainer');
const message = document.getElementById('message');
const reloadBtn = document.getElementById('reloadBtn');
const loadingSpinner = document.getElementById('loadingSpinner');

async function fetchUsers() {
    message.textContent = '';
    userContainer.innerHTML = '';
    loadingSpinner.style.display = 'block';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const users = await response.json();

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('userCard');

            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
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
