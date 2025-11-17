const app = document.getElementById("app");


// "Database"

const fixedUsername = "john";

const fixedEmail = "john@gmail.com";

let currentPassword = "123";


// Helper to render

function show(html) {

  app.innerHTML = html;

}


/* ========== SCREENS ========== */


function welcomeScreen() {

  show(`
<div class="screen">
<div class="card">
<div class="app-tag">MarketMind</div>
<div class="title">Welcome back.</div>
<div class="subtitle">

          Sign in to access the main screen of the app.
</div>

<button class="primary" onclick="loginScreen()">Login</button>
<button class="secondary" onclick="signupScreen()">Register (demo)</button>
<div class="notice">Demo account: john / 123</div>
</div>
</div>

  `);

}


function loginScreen(errorMsg = "") {

  show(`
<div class="screen">
<div class="card">
<div class="app-tag">Sign in</div>
<div class="title">Welcome back, creator.</div>
<div class="subtitle">Use the demo account to continue.</div>


        ${errorMsg ? `<div class="notice" style="color:#ff8f94;margin-bottom:8px;">${errorMsg}</div>` : ""}

<input id="login-username" placeholder="Username (e.g., john)">
<input id="login-password" placeholder="Password" type="password">

<div class="link" onclick="forgotUsernameScreen()">Forgot password?</div>

<button class="primary" onclick="handleLogin()">Sign In</button>
<button class="secondary" onclick="welcomeScreen()">Back</button>
<div class="notice">Demo: username <b>john</b>, password <b>123</b> (or your new one).</div>
</div>
</div>

  `);

}


function signupScreen() {

  // Just a visual placeholder – real auth is not required for your part

  show(`
<div class="screen">
<div class="card">
<div class="app-tag">Create account</div>
<div class="title">Sign up (demo only)</div>
<div class="subtitle">

          In a full version, this would create a new user.

          For now, use the demo login: john / 123.
</div>

<input placeholder="Email">
<input placeholder="Username">
<input placeholder="Password" type="password">

<button class="primary" onclick="loginScreen()">Continue to Login</button>
<button class="secondary" onclick="welcomeScreen()">Back</button>
</div>
</div>

  `);

}


/* ===== Forgot Password Flow ===== */


// Step 1: ask for username or email

function forgotUsernameScreen(errorMsg = "") {

  show(`
<div class="screen">
<div class="card">
<div class="app-tag">Password reset</div>
<div class="title">Find your account</div>
<div class="subtitle">

          Enter your username or email for the account you want to reset.
</div>


        ${errorMsg ? `<div class="notice" style="color:#ff8f94;margin-bottom:8px;">${errorMsg}</div>` : ""}

<input id="forgot-id" placeholder="Username or email (john or john@gmail.com)">
<button class="primary" onclick="handleForgotIdentity()">Next</button>
<button class="secondary" onclick="loginScreen()">Back to login</button>
</div>
</div>

  `);

}


let recoveryVerified = false;


// After they enter username/email

function handleForgotIdentity() {

  const value = document.getElementById("forgot-id").value.trim().toLowerCase();


  if (value === fixedUsername || value === fixedEmail) {

    recoveryVerified = true;

    securityQuestionScreen();

  } else {

    forgotUsernameScreen("We couldn't find that user. Try 'john' or 'john@gmail.com'.");

  }

}


// Step 2: security question

function securityQuestionScreen(errorMsg = "") {

  if (!recoveryVerified) {

    forgotUsernameScreen();

    return;

  }


  show(`
<div class="screen">
<div class="card">
<div class="app-tag">Security check</div>
<div class="title">One quick question.</div>
<div class="subtitle">

          To verify it's really you, answer this security question.
</div>

<div class="label">What is your favorite type of pet?</div>


        ${errorMsg ? `<div class="notice" style="color:#ff8f94;margin-bottom:8px;">${errorMsg}</div>` : ""}

<input id="pet-answer" placeholder="Type of pet (hint: cat)">
<button class="primary" onclick="handlePetAnswer()">Next</button>
<button class="secondary" onclick="loginScreen()">Cancel</button>
</div>
</div>

  `);

}


function handlePetAnswer() {

  const answer = document.getElementById("pet-answer").value.trim().toLowerCase();

  if (answer === "cat") {

    resetPasswordScreen();

  } else {

    securityQuestionScreen("Incorrect answer. Try again – hint: it's cat.");

  }

}


// Step 3: allow new password

function resetPasswordScreen(errorMsg = "") {

  show(`
<div class="screen">
<div class="card">
<div class="app-tag">New password</div>
<div class="title">Set a fresh password.</div>
<div class="subtitle">

          Your username is still <b>john</b>. Choose a new password to use when you sign in.
</div>


        ${errorMsg ? `<div class="notice" style="color:#ff8f94;margin-bottom:8px;">${errorMsg}</div>` : ""}

<input id="new-pass" placeholder="New password" type="password">
<button class="primary" onclick="handleResetPassword()">Save password</button>
<button class="secondary" onclick="loginScreen()">Back to login</button>
</div>
</div>

  `);

}


function handleResetPassword() {

  const val = document.getElementById("new-pass").value;

  if (!val) {

    resetPasswordScreen("Password can't be empty.");

    return;

  }

  currentPassword = val;

  recoveryVerified = false;

  loginScreen("Password updated. Use your new password to sign in.");

}


/* ===== Login handler ===== */


function handleLogin() {

  const u = document.getElementById("login-username").value.trim().toLowerCase();

  const p = document.getElementById("login-password").value;


  if (u === fixedUsername && p === currentPassword) {

    mainLoggedInScreen();

  } else {

    loginScreen("Incorrect username or password.");

  }

}

/* ======== Main / Profile / AI / Settings Pages ======== */

function renderBottomNav() {
  return `
<div style="
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #111218;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-top: 1px solid #2d3250;
">
  <div style="color:#9da5ff; cursor:pointer;" onclick="mainLoggedInScreen()">Home</div>
  <div style="color:#9da5ff; cursor:pointer;" onclick="profileScreen()">Profile</div>
  <div style="color:#9da5ff; cursor:pointer;" onclick="aiScreen()">AI</div>
</div>
`;
}

/* ======== Main / Profile / AI / Settings Pages ======== */

function renderBottomNav() {
  return `
<div style="
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #111218;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-top: 1px solid #2d3250;
">
  <div style="color:#9da5ff; cursor:pointer;" onclick="mainLoggedInScreen()">Home</div>
  <div style="color:#9da5ff; cursor:pointer;" onclick="profileScreen()">Profile</div>
  <div style="color:#9da5ff; cursor:pointer;" onclick="aiScreen()">AI</div>
</div>
`;
}

function mainLoggedInScreen() {
  show(`
<div class="screen">
<div class="card">
<div class="app-tag">MarketMind</div>
<div class="title">Welcome, ${fixedUsername}!</div>
<div class="subtitle">
  Welcome to MarketMind. Click the buttons below to view marketing ideas or discuss new ideas with our AI chatbot.
</div>

<button class="primary" onclick="profileScreen()">My Ideas</button>
<button class="primary" onclick="aiScreen()">AI</button>
</div>

<!-- Floating AI button -->
<button style="
  position: fixed;
  bottom: 80px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5564ff, #8b5dff);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(85, 100, 255, 0.45);
" title="AI" onclick="aiScreen()">🤖</button>

${renderBottomNav()}
</div>
  `);
}

function profileScreen() {
  const ideas = [
    { text: "The #OneRollChallenge", score: 78 },
    { text: "Interactive Texture Gallery", score: 92 },
    { text: "Coffee Waste Reuse Campaign", score: 85 },
  ];

  let ideasHTML = ideas
    .map(
      (idea, idx) => `
  <div class="ai-box">
    <b>Idea:</b> ${idea.text}<br>
    <div class="progress-bar-wrapper">
      <span class="progress-label">AI Score:</span>
      <div class="progress-bar-container">
        <div id="idea-bar-${idx}" class="progress-bar-fill"></div>
      </div>
      <span id="idea-score-${idx}" class="progress-percentage">0%</span>
    </div>
  </div>`
    )
    .join("");

  show(`
<div class="screen">
  <div class="card">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div class="app-tag">Profile</div>
      <button class="settings-btn" onclick="settingsScreen()" title="Settings">⚙️</button>
    </div>

    <div style="margin-top:10px; text-align:center;">
      <div class="title" style="font-size:18px;">Overall AI Score</div>
      <canvas id="ai-score-canvas" width="80" height="80" style="display:block; margin:0 auto;"></canvas>
    </div>

    ${ideasHTML}

  </div>

  <!-- Floating AI button -->
  <button style="
    position: fixed;
    bottom: 80px;
    right: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #5564ff, #8b5dff);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 12px 24px rgba(85, 100, 255, 0.45);
  " title="AI" onclick="aiScreen()">🤖</button>

  ${renderBottomNav()}
</div>
  `);

  animateAICircle("ai-score-canvas", 85);
  ideas.forEach((idea, idx) => animateIdeaBar(`idea-bar-${idx}`, `idea-score-${idx}`, idea.score));
}

function animateIdeaBar(barId, scoreId, targetScore) {
  const bar = document.getElementById(barId);
  const scoreText = document.getElementById(scoreId);
  let progress = 0;
  const interval = setInterval(() => {
    if (progress >= targetScore) {
      clearInterval(interval);
      progress = targetScore; // ensure exact final value
    }
    bar.style.width = progress + "%";
    scoreText.innerText = progress + "%";
    progress++;
  }, 12); // adjust speed here
}

function aiScreen() {
  show(`
<div class="screen">
<div class="card">
<div class="app-tag">AI</div>
<div class="title">AI Insights</div>
<div class="subtitle">This is a placeholder for your AI tools. You can integrate AI features here.</div>
</div>

${renderBottomNav()}
</div>
  `);
}

function settingsScreen() {
  show(`
<div class="screen">
<div class="card">
<div class="app-tag">Settings</div>
<div class="title">Account Settings</div>
<button class="danger" onclick="welcomeScreen()">Log Out</button>
<button class="secondary" onclick="profileScreen()">Back to Profile</button>
</div>
</div>
  `);
}

/* ======== AI Circle Animation ======== */
function animateAICircle(canvasId, score) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const radius = canvas.width / 2 - 4;
  let current = 0;

  function drawCircle(perc) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Background circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#2d3250";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Foreground progress
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      radius,
      -0.5 * Math.PI,
      (perc / 100) * 2 * Math.PI - 0.5 * Math.PI
    );
    ctx.strokeStyle = "#5564ff";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Text
    ctx.fillStyle = "#fff";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(Math.round(perc) + "%", canvas.width / 2, canvas.height / 2);
  }

  const interval = setInterval(() => {
    if (current >= score) {
      clearInterval(interval);
    } else {
      current++;
      drawCircle(current);
    }
  }, 10);
}

/* ======== Start App ======== */
welcomeScreen();
