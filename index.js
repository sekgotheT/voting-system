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

// Confirm you Registration details to Vote
function confirmregistrationtoVote() {
  const name = document.getElementById('voter-name').value;
  const id = document.getElementById('voter-id').value;

  // Check if student is in registered list
  const student = registeredStudents.find(s => s.id === id && s.name === name);
  if (student) {
    localStorage.setItem('voterName', name);
    localStorage.setItem('voterID', id);
    document.getElementById('registration-message').textContent = "Registration confirmed , you can vote!";
    
    document.getElementById('registration-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
  } else {
    document.getElementById('registration-message').textContent = "Not a registered student.";
  }
}

// Confirm you registration ID to Vote
function loginVoter() {
  const enteredID = document.getElementById('login-id').value;
  const storedID = localStorage.getItem('voterID');

  if (enteredID === storedID) {
    document.getElementById('login-message').textContent = "confirmation successful,you can vote.!";
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

  fetch('http://localhost:5000/api/votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voterID, candidate })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('vote-message').textContent = data.message;
    localStorage.setItem(`votedFor_${candidate}`, true); // Mark as voted
  })
  .catch(() => {
    document.getElementById('vote-message').textContent = "Voting failed.";
  });
}

// Redirect to Admin
function redirectToAdmin() {
  window.location.href = "admin-login.html";
}
