const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const app = express();

const DEMO_USER = {
  email: "admin_juice_shop@gmail.com",
  password: "HW3_Secured_67"
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateLoginInput(body) {
  if (!body || typeof body.email !== "string" || typeof body.password !== "string") {
    return "Invalid request body.";
  }

  const email = body.email.trim();
  const password = body.password;

  if (!email || !password) {
    return "Email and password are required.";
  }

  if (!email.includes("@") || !isValidEmail(email)) {
    return "Email format is invalid.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return null;
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(PUBLIC_DIR));

app.post("/api/login", (req, res) => {
  const validationError = validateLoginInput(req.body);
  if (validationError) {
    res.status(400).json({ message: validationError });
    return;
  }

  const email = req.body.email.trim();
  const password = req.body.password;
  const success = email === DEMO_USER.email && password === DEMO_USER.password;

  if (!success) {
    res.status(401).json({ message: "Invalid email or password." });
    return;
  }

  res.status(200).json({ message: "Login successful." });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ message: "Malformed JSON." });
    return;
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
