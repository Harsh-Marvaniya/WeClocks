const form = document.getElementById('loginForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const imageInput = document.getElementById('image');
const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const imageFile = imageInput.files[0];

    let imageUrl = '';
    if (imageFile) {
        imageUrl = await convertToBase64(imageFile);
    }

    const userData = { name, email, password, image: imageUrl };

    const createdUser = await createUser(userData);
    if (createdUser) {
        alert('Submit successfully');
        loadData();
    }
});

async function loadData() {
    const users = await getAllUsers();
    dataTable.innerHTML = '';
    users.forEach(user => {
        const row = dataTable.insertRow();
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.password}</td>
            <td><img src="${user.image || ''}" alt="User Image"></td>
            <td><button onclick="deleteUser(${user.id})">Delete</button></td>
        `;
    });
}

async function deleteUser(userId) {
    const isDeleted = await removeUser(userId);
    if (isDeleted) {
        loadData();
    }
}

async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

loadData();
