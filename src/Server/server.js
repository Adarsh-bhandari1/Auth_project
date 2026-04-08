import express from 'express';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './auth.js';
passportConfig();
const app = express();
const port = 3000;
app.use(express.json());

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




app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ msg: "Login Success", user: req.user });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
