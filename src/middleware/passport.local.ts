import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "../services/auth.services";

const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        function (username, password, done) {
            console.log(">>>check username and password", username, password);
            return handleLogin(username, password, done)
        }
    ));
}
export default configPassportLocal;