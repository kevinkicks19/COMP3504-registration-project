document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch('process-login.php', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            if (result.redirect) {
                window.location.href = result.redirect;
            } else if (result.error) {
                document.getElementById('error-message').textContent = result.error;
            }
        } else {
            const errorText = await response.text();
            document.getElementById('error-message').textContent = errorText || 'Login failed.';
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    }
});
