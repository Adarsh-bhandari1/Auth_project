import passport from "passport";
import { LocalStrategy } from "passport-local";

passport.use(new LocalStrategy(
    (username, password, done) => {
    if (username === "admin" && password === "admin") {
        return done(null, { username: "admin" });
    }
    return done(null, false);
}));
