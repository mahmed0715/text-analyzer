const BASE_URL = '';

    function toggleForms() {
      const loginForm = document.getElementById('login-form');
      const signupForm = document.getElementById('signup-form');
      loginForm.classList.toggle('hidden');
      signupForm.classList.toggle('hidden');
    }

    async function login() {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      if (!email || !password) {
        return alert('Please fill in all fields');
      }

      try {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) return alert(data.message || 'Login failed');

        localStorage.setItem('token', data.token);
        window.location.href = '/index.html';
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    }

    async function signup() {
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;

      if (!name || !email || !password || !confirmPassword) {
        return alert('Please fill in all fields');
      }

      if (password !== confirmPassword) {
        return alert('Passwords do not match');
      }

      try {
        const res = await fetch(`${BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (!res.ok) return alert(data.message || 'Signup failed');

        alert('Signup successful! Please login.');
        toggleForms();
      } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('signup-btn').addEventListener('click', signup);
        document.getElementById('login-btn').addEventListener('click', login);
        document.getElementById('signup-link').addEventListener('click', toggleForms);
        document.getElementById('login-link').addEventListener('click', toggleForms);
    });
    