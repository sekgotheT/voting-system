// Dummy list of registered students
const registeredStudents = [
  { id: "TUT202301", name: "Alice" },
  { id: "TUT202302", name: "Bob" },
  { id: "TUT202303", name: "Carol" },
  { id: "TUT202304", name: "Dave" },
  { id: "TUT202305", name: "Eve" },
  { id: "TUT202306", name: "Frank" },
  { id: "TUT202307", name: "Grace" },
  { id: "TUT202308", name: "Hank" },
  { id: "TUT202309", name: "Ivy" },
  { id: "TUT202310", name: "Jack" },
];

// Step 1: Confirm Registration Details
function confirmRegistration() {
  const name = document.getElementById('voter-name').value;
  const id = document.getElementById('voter-id').value;

  // Check if student is in the registered list
  const student = registeredStudents.find(s => s.id === id && s.name === name);
  if (student) {
    localStorage.setItem('voterName', name);
    localStorage.setItem('voterID', id);
    document.getElementById('registration-message').textContent = "Registration confirmed, you can proceed.";
    
    document.getElementById('registration-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
  } else {
    document.getElementById('registration-message').textContent = "Not a registered student.";
  }
}

// Step 2: Confirm ID Again to Vote
function loginVoter() {
  const enteredID = document.getElementById('login-id').value;
  const storedID = localStorage.getItem('voterID');

  if (enteredID === storedID) {
    const hasVoted = localStorage.getItem(`hasVoted_${storedID}`);
    if (hasVoted) {
      document.getElementById('login-message').textContent = "You have already voted and cannot vote again.";
    } else {
      document.getElementById('login-message').textContent = "Confirmation successful, you can vote!";
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('vote-section').style.display = 'block';
    }
  } else {
    document.getElementById('login-message').textContent = "Invalid ID. Please register first.";
  }
}

// Step 3: Submit Vote
function submitVote() {
  const candidate = document.getElementById('candidate-select').value;
  const voterID = localStorage.getItem('voterID');

  // Check if the student has already voted
  if (localStorage.getItem(`hasVoted_${voterID}`)) {
    document.getElementById('vote-message').textContent = "You have already voted and cannot vote again.";
    return;
  }

  // Proceed with voting if not already voted
  fetch('http://localhost:5000/api/votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voterID, candidate })
  })
  .then(response => response.json())
  .then(data => {
    // Mark as voted and show confirmation message
    localStorage.setItem(`hasVoted_${voterID}`, true); // Mark this voter as having voted
    document.getElementById('vote-message').textContent = data.message || "Your vote has been recorded. Thank you!";
  })
  .catch(() => {
    document.getElementById('vote-message').textContent = "Voting failed. Please try again.";
  });
}

// Redirect to Admin Page
function redirectToAdmin() {
  window.location.href = "admin-login.html";
}
