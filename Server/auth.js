import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const user = {
    id : 1,
    username: "adarsh",
    password: "123"
};
const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.VITE_GOOGLE_CLIENT_SECRET;
function passportConfig() {
    passport.use(
        new LocalStrategy(
            (username, password, done) => {
                if (username === "adarsh" && password === "123") {
                    return done(null, user);
                }
                // ✅ Must call done(null, false) on bad credentials, not return undefined
                return done(null, false, { message: "Invalid credentials" });
            }
        )
    )
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
          return done(null, profile);
        },
      ),
    );
    // ✅ Store a minimal identifier that works for both local & Google users
    passport.serializeUser((u, done) => {
        // Google profiles use u.id (string), local user uses u.id (number)
        done(null, { id: u.id, provider: u.provider || "local" });
    });
    passport.deserializeUser((obj, done) => {
        if (obj.provider === "local") {
            // Restore the local hardcoded user
            done(null, user);
        } else {
            // For Google, we stored the whole profile in the session via obj;
            // simply pass the minimal object back (enough to show displayName etc.)
            done(null, obj);
        }
    })
};
export default passportConfig;