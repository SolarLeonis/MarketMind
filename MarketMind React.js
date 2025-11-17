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
<div class="subtitle">Sign in to access the main screen of the app.
</div>

<button class="primary" onclick="loginScreen()">Login</button>
<button class="secondary" onclick="signupScreen()">Register (demo)</button>
<div class="notice">Demo account: john / 123</div>
</div></div>`);
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
  show(`<div class="screen">
<div class="card">
<div class="app-tag">Create account</div>
<div class="title">Sign up (demo only)</div>
<div class="subtitle">In a full version, this would create a new user. For now, use the demo login: john / 123.</div>
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

//After they enter username/email
function handleForgotIdentity() {
  const value = document.getElementById("forgot-id").value.trim().toLowerCase();
  if (value === fixedUsername || value === fixedEmail) {
    recoveryVerified = true;
    securityQuestionScreen();
  } else {
    forgotUsernameScreen("We couldn't find that user. Try 'john' or 'john@gmail.com'.");
  }
}

//Step 2: security question
function securityQuestionScreen(errorMsg = "") {
  if (!recoveryVerified) {
    forgotUsernameScreen();
    return;
  }
  show(`<div class="screen">
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
  }  else {
    securityQuestionScreen("Incorrect answer. Try again – hint: it's cat.");
  }
}

//Step 3: allow new password
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
  const usernameEl = document.getElementById("login-username");
  const passwordEl = document.getElementById("login-password");
  const u = usernameEl ? usernameEl.value.trim().toLowerCase() : "";
  const p = passwordEl ? passwordEl.value : "";
  if (u === fixedUsername && p === currentPassword){
  // Instead of going straight to home, show intro screens first
    introStep = 0;
    appIntroScreen();  }
  else loginScreen("Incorrect username or password.");
}

let introStep = 0;

function appIntroScreen() {
  let header = "", subheader = "", body = "";

  if (introStep === 0) {
    header = "Let's Discover";
    subheader = "Test your marketing ideas";
    body = "Submit your marketing questions or choose from common campaign ideas, then get AI-powered insights to see which strategies have the most potential.";
  } else if (introStep === 1) {
    header = "See what Resonates";
    subheader = "AI insights reveal which ideas have the most impact.";
    body = "After submitting your questions or ideas, our AI analyzes responses to highlight the most compelling options. Use these insights to make data-driven marketing decisions and refine your strategies.";
  }

  show(`
    <div class="screen">
      <div class="card">
        <div class="app-tag">MarketMind</div>
        <div class="title">${header}</div>
        <div class="subtitle">${subheader}</div>
        <div class="body" style="margin-bottom:32px; line-height:1.5;">${body}</div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="progress-indicator" style="font-size:12px; color:#888aa0;">Step ${introStep + 1}/2</div>
          <button class="next-btn" onclick="nextIntro()">Next →</button>
        </div>
      </div>
    </div>
  `);
}



function nextIntro() {
  introStep++;
  if (introStep >= 2) {
    introStep = 0;
    mainLoggedInScreen(); // Go to main home screen after last intro page
  } else {
    appIntroScreen();
  }
}

// =========================
// Main / Profile / AI
// =========================
function renderBottomNav() {
  return `<div style="
  position: fixed; bottom: 0; left: 0; width: 100%;
  background: #111218; display:flex; justify-content: space-around; padding:12px 0;
  border-top:1px solid #2d3250;">
  <div style="color:#9da5ff; cursor:pointer;" onclick="mainLoggedInScreen()">Home</div>
  <div style="color:#9da5ff; cursor:pointer;" onclick="profileScreen()">Profile</div>
  <div style="color:#9da5ff; cursor:pointer;" onclick="aiScreen()">AI</div>
  </div>`;
}

function mainLoggedInScreen() {
  show(`<div class="screen">
<div class="card">
<div class="app-tag">MarketMind</div>
<div class="title">Welcome, ${fixedUsername}!</div>
<div class="subtitle">Click below to view marketing ideas or discuss new AI insights.</div>
<button class="primary" onclick="profileScreen()">My Ideas</button>
<button class="primary" onclick="aiScreen()">AI</button>
</div>

<!-- Floating AI button always works -->
<button class="floating-ai" title="AI" onclick="aiScreen()">🤖</button>

${renderBottomNav()}</div>`);
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
      <!-- Settings button calls global function -->
      <button class="settings-btn" id="settings-btn" title="Settings">⚙️</button>
    </div>

    <div style="margin-top:10px; text-align:center;">
      <div class="title" style="font-size:18px;">Overall AI Score</div>
      <canvas id="ai-score-canvas" width="80" height="80" style="display:block; margin:0 auto;"></canvas>
    </div>

    ${ideasHTML}
  </div>

  <!-- Floating AI button -->
  <button class="floating-ai" title="AI" onclick="aiScreen()">🤖</button>

  ${renderBottomNav()}
</div>
  `);

  // Add event listener for settings button AFTER show()
  document.getElementById("settings-btn").addEventListener("click", settingsScreen);

  // Animate profile bars
  animateAICircle("ai-score-canvas", 85);
  ideas.forEach((idea, idx) => animateIdeaBar(`idea-bar-${idx}`, `idea-score-${idx}`, idea.score));
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

  <!-- Floating AI button -->
  <button class="floating-ai" title="AI" onclick="aiScreen()">🤖</button>

  ${renderBottomNav()}
</div>
  `);
}

// =========================
// Animate Functions
// =========================
function animateIdeaBar(barId, scoreId, targetScore) {
  const bar = document.getElementById(barId);
  const scoreText = document.getElementById(scoreId);
  let progress = 0;
  const interval = setInterval(() => {
    if (progress >= targetScore) { clearInterval(interval); progress = targetScore; }
    bar.style.width = progress + "%";
    scoreText.innerText = progress + "%";
    progress++;
  }, 12);
}

function animateAICircle(canvasId, score) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const radius = canvas.width / 2 - 4;
  let current = 0;

  function drawCircle(perc) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#2d3250";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius,
      -0.5 * Math.PI,
      (perc / 100) * 2 * Math.PI - 0.5 * Math.PI
    );
    ctx.strokeStyle = "#5564ff";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(Math.round(perc) + "%", canvas.width / 2, canvas.height / 2);
  }

  const interval = setInterval(() => {
    if (current >= score) { clearInterval(interval); }
    else { current++; drawCircle(current); }
  }, 10);
}

function aiScreen() {
  show(`
<div class="screen">
  <div class="card">
    <div class="app-tag">AI</div>
    <div class="title">AI Insights</div>
    <div class="subtitle">Interact with AI responses below and provide feedback.</div>

    <div class="ai-feedback" id="ai-feedback-demo">
      <span class="ai-badge">AI</span>

      <button class="btn support" id="support-btn">👍 0</button>
      <button class="btn dont-support" id="dont-support-btn">👎 0</button>
      <button class="btn text-link" id="add-feedback-btn">Add feedback</button>

      <div class="text-editor" id="text-editor" style="display:none;">
        <textarea id="feedback-text" placeholder="Optional feedback (1000 chars)" rows="3"></textarea>
        <div class="editor-actions">
          <button id="submit-feedback">Submit</button>
          <button id="cancel-feedback">Cancel</button>
        </div>
      </div>

      <span class="undo" id="undo-feedback" style="display:none;">
        Feedback recorded • <button id="undo-btn">Undo</button>
      </span>
    </div>
  </div>
  
  ${renderBottomNav()}
</div>
  `);

  // ===== JS for feedback interaction =====
  let supportCount = 0;
  let dontSupportCount = 0;
  let userVote = null;
  let undoTimer = null;

  const supportBtn = document.getElementById("support-btn");
  const dontSupportBtn = document.getElementById("dont-support-btn");
  const addFeedbackBtn = document.getElementById("add-feedback-btn");
  const textEditor = document.getElementById("text-editor");
  const feedbackText = document.getElementById("feedback-text");
  const submitFeedback = document.getElementById("submit-feedback");
  const cancelFeedback = document.getElementById("cancel-feedback");
  const undoFeedback = document.getElementById("undo-feedback");
  const undoBtn = document.getElementById("undo-btn");

  function updateCounts() {
    supportBtn.innerText = `👍 ${supportCount || ""}`;
    dontSupportBtn.innerText = `👎 ${dontSupportCount || ""}`;
    supportBtn.className = "btn support" + (userVote === "support" ? " active" : "");
    dontSupportBtn.className = "btn dont-support" + (userVote === "dont_support" ? " active" : "");
  }

  function submitVote(vote) {
    const prevVote = userVote;
    if (vote === "support") {
      supportCount += (prevVote === "support" ? 0 : 1);
      if (prevVote === "dont_support") dontSupportCount = Math.max(0, dontSupportCount - 1);
    } else {
      dontSupportCount += (prevVote === "dont_support" ? 0 : 1);
      if (prevVote === "support") supportCount = Math.max(0, supportCount - 1);
    }
    userVote = vote;
    updateCounts();

    undoFeedback.style.display = "inline";
    clearTimeout(undoTimer);
    undoTimer = setTimeout(() => undoFeedback.style.display = "none", 10000);
    textEditor.style.display = "none";
    feedbackText.value = "";
  }

  supportBtn.onclick = () => submitVote("support");
  dontSupportBtn.onclick = () => submitVote("dont_support");
  addFeedbackBtn.onclick = () => textEditor.style.display = textEditor.style.display === "none" ? "block" : "none";
  cancelFeedback.onclick = () => { textEditor.style.display = "none"; feedbackText.value = ""; };
  submitFeedback.onclick = () => submitVote(userVote || "support");
  undoBtn.onclick = () => {
    if (!userVote) return;
    if (userVote === "support") supportCount = Math.max(0, supportCount - 1);
    if (userVote === "dont_support") dontSupportCount = Math.max(0, dontSupportCount - 1);
    userVote = null;
    updateCounts();
    undoFeedback.style.display = "none";
  };
}

/* Start the app on welcome screen */
welcomeScreen();
