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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
