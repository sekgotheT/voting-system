const BASE_URL = 'http://localhost:5000/api';

// --- Registration Confirmation ---
document.getElementById('register-button').addEventListener('click', async () => {
  const name = document.getElementById('voter-name').value;
  const id = document.getElementById('voter-id').value;

  try {
    const res = await fetch(`${BASE_URL}/auth/confirm-registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, id })
    });
    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem('voterID', id); // Store voter ID
      document.getElementById('registration-message').textContent = 'Registration confirmed, proceed to login!';
      document.getElementById('Confirmation of registration-section').style.display = 'none';
      document.getElementById('login-section').style.display = 'block';
    } else {
      document.getElementById('registration-message').textContent = data.message || 'Registration failed.';
    }
  } catch (err) {
    console.error('Registration Error:', err);
    document.getElementById('registration-message').textContent = 'Registration failed.';
  }
});

// --- Login Confirmation ---
document.getElementById('login-button').addEventListener('click', async () => {
  const id = document.getElementById('login-id').value;
  const storedID = localStorage.getItem('voterID');

  if (id === storedID) {
    document.getElementById('login-message').textContent = 'Login successful, proceed to vote!';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('vote-section').style.display = 'block';
  } else {
    document.getElementById('login-message').textContent = 'Invalid ID. Please register first.';
  }
});

// --- Vote Submission ---
document.getElementById('vote-button').addEventListener('click', async () => {
  const candidate = document.getElementById('candidate-select').value;
  const voterID = localStorage.getItem('voterID');

  try {
    const res = await fetch(`${BASE_URL}/votes/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${voterID}`
      },
      body: JSON.stringify({ candidate })
    });
    const data = await res.json();

    if (res.ok && data.success) {
      document.getElementById('vote-message').textContent = 'Vote recorded successfully!';
      document.getElementById('vote-button').disabled = true; // Disable voting after successful submission
      localStorage.setItem(`votedFor_${voterID}`, true); // Mark as voted
    } else {
      document.getElementById('vote-message').textContent = data.message || 'Voting failed.';
    }
  } catch (err) {
    console.error('Voting Error:', err);
    document.getElementById('vote-message').textContent = 'Voting failed.';
  }
});

// --- Check if Already Voted ---
function checkIfVoted() {
  const voterID = localStorage.getItem('voterID');
  if (localStorage.getItem(`votedFor_${voterID}`)) {
    document.getElementById('vote-message').textContent = 'Student has already voted.';
    document.getElementById('vote-button').disabled = true; // Disable voting button if already voted
  }
}

// --- Initialize on Page Load ---
window.onload = () => {
  checkIfVoted();
};
