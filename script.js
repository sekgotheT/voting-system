const BASE_URL = 'http://localhost:5000/api';

// --- User Registration ---
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    document.getElementById('register-message').textContent = data.message;
    if (data.success) {
      document.getElementById('register-section').style.display = 'none';
      document.getElementById('login-section').style.display = 'block';
    }
  } catch (err) {
    document.getElementById('register-message').textContent = 'Registration failed.';
  }
});

// --- User Login ---
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('vote-section').style.display = 'block';
    } else {
      document.getElementById('login-message').textContent = data.message;
    }
  } catch (err) {
    document.getElementById('login-message').textContent = 'Login failed.';
  }
});

// --- Vote Submission ---
document.getElementById('vote-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const candidateID = document.getElementById('candidate-select').value;
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${BASE_URL}/votes/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ candidateID })
    });
    const data = await res.json();
    document.getElementById('vote-message').textContent = data.message;
    document.getElementById('vote-form').style.display = 'none';
  } catch (err) {
    document.getElementById('vote-message').textContent = 'Voting failed.';
  }
});
