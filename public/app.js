const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formMessage = document.getElementById("form-message");

function setMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("error", isError);
}

function validateClient(email, password) {
  let valid = true;
  emailError.textContent = "";
  passwordError.textContent = "";

  if (!email || !password) {
    setMessage("Email and password are required.", true);
    valid = false;
  }

  if (!email.includes("@")) {
    emailError.textContent = "Email must include '@'.";
    valid = false;
  }

  if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    valid = false;
  }

  if (valid) {
    setMessage("");
  }

  return valid;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!validateClient(email, password)) {
    return;
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const payload = await response.json();
    setMessage(payload.message, !response.ok);
  } catch (error) {
    setMessage("Could not connect to server.", true);
  }
});
