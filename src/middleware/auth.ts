import { Request, Response, NextFunction } from "express";


const isLogined = (req: Request, res: Response, next: NextFunction) => {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
        return next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export { isLogined };