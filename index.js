<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voting System</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Voting System</h1>

  <!-- Registration Confirmation Section -->
  <div id="registration-section">
    <h2>Confirm Your Registration Details to Vote</h2>
    <input type="text" id="voter-name" placeholder="Enter Name" required>
    <input type="text" id="voter-id" placeholder="Enter ID Number" required>
    <button onclick="confirmRegistration()">Confirm</button>
    <p id="registration-message" style="color: green;"></p>
  </div>

  <!-- ID Confirmation Section -->
  <div id="login-section" style="display: none;">
    <h2>Enter Your Confirmed ID to Vote</h2>
    <input type="text" id="login-id" placeholder="Enter Registered ID Number" required>
    <button onclick="loginVoter()">Confirm</button>
    <p id="login-message" style="color: red;"></p>
  </div>

  <!-- Voting Section -->
  <div id="vote-section" style="display: none;">
    <h2>Vote for Your Preferred Party</h2>
    <select id="candidate-select">
      <option value="EFFSC">EFF Student Command (EFFSC)</option>
      <option value="Sasco">South African Students Congress (Sasco)</option>
      <option value="Sadesmo">South African Democratic Student Movement (Sadesmo)</option>
      <option value="DASO">Democratic Alliance Student Organization (DASO)</option>
      <option value="ANCYL">ANC Youth League (ANCYL)</option>
      <option value="Umkhonto">Umkhonto Wesizwe Youth League</option>
      <option value="RiseMzansi">Rise Mzansi</option>
    </select>
    <button onclick="submitVote()">Vote</button>
    <p id="vote-message"></p>
  </div>

  <!-- Admin Redirect Button -->
  <button onclick="redirectToAdmin()">Admin Login</button>

  <script src="index.js"></script>
  <script src="script.js"></script>
</body>
</html>
