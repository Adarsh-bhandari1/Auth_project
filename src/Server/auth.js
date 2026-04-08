import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
const user = {
    id : 1,
    username: "adarsh",
    password: "123"
};

function passportConfig() {
    passport.use(
        new LocalStrategy(
            (username, password, done) => {
                if (username === "admin " && password === "123") {
                    return done(null, user);
                }
            }
        )
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        done(null, user);
    })
};
export default passportConfig;