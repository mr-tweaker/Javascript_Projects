document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const messageDiv = document.getElementById('message');

    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageDiv.textContent = ''; // Clear any previous messages
        messageDiv.classList.remove('success', 'error');

        const email = document.getElementById('email').value;

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // Password reset email sent successfully
                messageDiv.textContent = data.message || 'Password reset link sent to your email.';
                messageDiv.classList.add('success');
                forgotPasswordForm.reset(); // Clear the form
            } else {
                // Display error message
                messageDiv.textContent = data.message || 'Failed to send reset link. Please try again.';
                messageDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'An error occurred. Please try again.';
            messageDiv.classList.add('error');
        }
    });
});