import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "../services/auth.services";

import { handleGetUserById } from "../services/user.services";

const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        // usernameField: 'username',
        // passwordField: 'password',
        passReqToCallback: true, // Allows us to pass the request
    },
        function (req, username, password, done) {

            return handleLogin(username, password, done)
        }
    ));
    // mã hóa thông tin người dùng vào session
    passport.serializeUser(function (user: any, cb) {
        // console.log("serializeUser", user);

        cb(null, { id: user.id, username: user.userName });
    });
    // giải mã thông tin người dùng từ session => mục đích là để lấy thông tin người dùng từ session gán vào req.user ta có thể dựa vào role để phần quyền cho các route khác
    passport.deserializeUser(async function (user: any, cb) {
        const { id, userName } = user;
        // query user from database
        const userInDb = await handleGetUserById(id);
        return cb(null, { ...userInDb });
    });
}
export default configPassportLocal;