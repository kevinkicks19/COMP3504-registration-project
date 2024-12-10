document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    // Handle registration form
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission
            console.log('Registration form submitted');

            // Collect form data
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const fullName = document.getElementById('name').value.trim();
            const nameParts = fullName.split(' ');

            const firstName = nameParts[0] || ''; // Handle missing first name
            const lastName = nameParts.slice(1).join(' ') || ''; // Handle missing last name
            const pronouns = document.getElementById('pronouns').value.trim();
            const role = document.getElementById('role').value;
            const dietaryRestriction = document.getElementById('dietary_restrictions')?.value.trim() || '';

            const payload = {
                username,
                password,
                firstname: firstName,
                lastname: lastName,
                role,
                pronouns,
                dietary_restriction: dietaryRestriction,
            };

            try {
                // Send registration request
                const response = await fetch('http://35.209.245.183:3000/api/accountcreation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const result = await response.json();

                if (response.ok) {
                    console.log('Registration successful:', result);
                    // Redirect to profile page with the username
                    window.location.href = `main.html?username=${encodeURIComponent(username)}`;
                } else {
                    console.error('Registration failed:', result.message || 'Unknown error');
                    alert(`Registration failed: ${result.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred during registration. Please try again.');
            }
        });
    } else {
        console.log('Registration form not found.');
    }

    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Login form submitted');

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            try {
                // Send login request
                const response = await fetch('http://35.209.245.183:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                console.log('Response status:', response.status);

                if (response.ok) {
                    const result = await response.json();
                    console.log('Response result:', result);

                    // Redirect based on the user's role
                    if (result.message === "Login successful") {
                        if (result.user.role === 'admin') {
                            window.location.href = 'admin-dashboard.php';
                        } else {
                            window.location.href = 'index.php';
                        }
                    } else {
                        console.error('Unexpected response:', result);
                    }
                } else {
                    const error = await response.json();
                    console.error('Login failed:', error);
                    document.getElementById('error-message').textContent = error.error || 'Login failed.';
                }
            } catch (error) {
                console.error('Error during login:', error);
                document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
            }
        });
    } else {
        console.log('Login form not found.');
    }
});
