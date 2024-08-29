document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const authForms = document.getElementById('authForms');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      authForms.style.display = 'block';
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      forgotPasswordForm.style.display = 'none';
    });
  
    registerLink.addEventListener('click', (e) => {
      e.preventDefault();
      authForms.style.display = 'block';
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      forgotPasswordForm.style.display = 'none';
    });
  
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.style.display = 'none';
      forgotPasswordForm.style.display = 'block';
    });
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          authForms.style.display = 'none';
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('registerUsername').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
          registerForm.reset();
          loginForm.style.display = 'block';
          registerForm.style.display = 'none';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    forgotPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('forgotEmail').value;
      
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
          forgotPasswordForm.reset();
          loginForm.style.display = 'block';
          forgotPasswordForm.style.display = 'none';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });