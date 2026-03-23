# HW3 - OWASP Juice Shop Mimicked Login Form

This project implements a login form that mimics OWASP Juice Shop using HTML, CSS, and JavaScript with both client-side and server-side validation. 

The UI includes email and password fields, inline field errors, and a status message. On the client side, JavaScript checks that required fields are present, that the email format is valid, and that the password is at least 8 characters long before sending the request. On the server side, Express revalidates all rules at `POST /api/login` so browser-side checks cannot be bypassed.

## Files

- `public/index.html` - Login form markup.
- `public/styles.css` - Login form styling.
- `public/app.js` - Client-side validation and submit logic.
- `server.js` - Express server, CORS middleware, static hosting, and API validation.
- `package.json` - Start script and dependencies.

## Run Locally

1. Install Node.js
1. In the project directory, run:

```bash
npm install
npm start
```

3. Open `http://localhost:3000` in your browser.

## Demo Credentials

- Email: `admin_juice_shop@gmail.com`
- Password: `HW3_Secured_67`
