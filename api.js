const BASE_URL = 'https://6792036bcf994cc680484b47.mockapi.io/';

async function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your-upload-preset');

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

async function createUser(userData) {
    try {
        const response = await fetch(`${BASE_URL}/User`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

async function getAllUsers() {
    try {
        const response = await fetch(`${BASE_URL}/User`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function removeUser(userId) {
    try {
        const response = await fetch(`${BASE_URL}/User/${userId}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (error) {
        console.error(`Error deleting user ${userId}:`, error);
    }
}
