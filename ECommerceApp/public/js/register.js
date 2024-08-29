document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = ''; // Clear any previous error messages

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Enhanced form validation
        if (!username || !email || !password || !confirmPassword) {
            errorMessage.textContent = 'Please fill in all fields.';
            return;
        }

        if (password.length < 8) {
            errorMessage.textContent = 'Password must be at least 8 characters long.';
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match.';
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                alert(data.message || 'Registration successful! Please log in.');
                window.location.href = '/login';
            } else {
                // Display error message
                errorMessage.textContent = data.message || 'Registration failed. Please try again.';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    });

    // Add real-time password matching validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    function validatePasswordMatch() {
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Passwords do not match');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    }

    passwordInput.addEventListener('change', validatePasswordMatch);
    confirmPasswordInput.addEventListener('keyup', validatePasswordMatch);
});