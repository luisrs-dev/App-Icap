import { NextFunction, Request, Response } from "express";
import { verifyRefreshToken, verifyToken } from "../utils/jwt.handle";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request {
    user?: string | JwtPayload;
}

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization!.split(" ")[1];
        const decodedToken = verifyToken(token);

        if (typeof decodedToken === 'string') {
            return decodedToken;
        } else {
            req.user = { email: decodedToken.email, userId: decodedToken.id };
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400)
        res.send("UNAUTHORIZED")
    }
}

export { checkJwt }