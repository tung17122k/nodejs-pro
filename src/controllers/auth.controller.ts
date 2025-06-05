
import passport from "passport";
import { Request, Response, NextFunction } from "express";

const loginController = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        return res.status(200).json({ message: "Login successful", user });
    })(req, res, next);
};

export { loginController };
