import express from 'express';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './auth.js';
import cors from 'cors';
passportConfig();
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge : 1000*60*60
        },
    }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials:true,
    })
)


app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return res.status(500).json({ message: "Error" });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login error" });

      return res.json({ msg: "Login Success", user });
    });
  })(req, res, next);
});

// Just to verify the login is successful or not

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      message: "User is logged in",
      user: req.user,
    });
  } else {
    return res.status(401).json({
      message: "Not logged in",
    });
  }
});

// ── Google OAuth routes ──────────────────────────────────────────────────────

// Step 1: redirect user to Google's consent screen
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google redirects back here after the user approves
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/level3", // back to L3 on failure
  }),
  (req, res) => {
    // Success → send user to the dedicated OAuth callback page
    res.redirect("http://localhost:5173/auth/callback");
  }
);

// Logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.json({ message: "Logged out" });
  });
});

// ─────────────────────────────────────────────────────────────────────────────

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
