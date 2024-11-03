// Store URL for API
const BASE_URL = 'http://localhost:5000/api';

// Register Voter
function registerVoter() {
  const name = document.getElementById('voter-name').value;
  const id = document.getElementById('voter-id').value;

  if (name && id) {
    // Store voter info in localStorage
    localStorage.setItem('voterName', name);
    localStorage.setItem('voterID', id);
    document.getElementById('registration-message').textContent = "Registration successful!";
    
    // Show login section and hide registration
    document.getElementById('registration-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
  } else {
    document.getElementById('registration-message').textContent = "Please fill in all details.";
  }
}

// Login Voter to Vote
function loginVoter() {
  const enteredID = document.getElementById('login-id').value;
  const storedID = localStorage.getItem('voterID');

  if (enteredID === storedID) {
    document.getElementById('login-message').textContent = "Login successful!";
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('vote-section').style.display = 'block';
  } else {
    document.getElementById('login-message').textContent = "Invalid ID. Please register first.";
  }
}

// Submit Vote
function submitVote() {
  const candidate = document.getElementById('candidate-select').value;
  const voterID = localStorage.getItem('voterID');

  if (!voterID) {
    document.getElementById('vote-message').textContent = "Please register or log in to vote.";
    return;
  }

  if (!localStorage.getItem(`votedFor_${candidate}`)) {
    fetch(`${BASE_URL}/votes/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ voterID, candidate })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('vote-message').textContent = data.message || "Vote submitted successfully!";
      localStorage.setItem(`votedFor_${candidate}`, true); // Mark candidate as voted
    })
    .catch(error => {
      document.getElementById('vote-message').textContent = "Voting failed: " + error.message;
    });
  } else {
    document.getElementById('vote-message').textContent = "You can only vote once per candidate.";
  }
}

// Redirect to Admin Login
function redirectToAdmin() {
  window.location.href = "admin-login.html";
}
