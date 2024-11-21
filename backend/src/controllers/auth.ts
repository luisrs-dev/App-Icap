// AuthController
import { Request, Response } from "express"
import { loginUser, registerNewUser } from '../services/auth'
import { getSessions } from "../services/sessions";
import { verify } from "jsonwebtoken";
import { generateToken, verifyRefreshToken } from "../utils/jwt.handle";


const registerCtrl = async ({ body }: Request, res: Response) => {
    console.log({ body });

    const responseUser = await registerNewUser(body);
    res.send(responseUser);
}

const loginCtrl = async (req: Request, res: Response) => {
    const { rut, password } = req.body;
    const responseUser = await loginUser({ rut, password }, res);

    const refreshTokenCookie = req.cookies.refreshToken;

    if (responseUser === 'PASSWORD_INCORRECT') {
        res.status(403)
        res.send(responseUser)
    } else {
        res.status(200).send(responseUser)
    }
}

const sessionListCtrl = async (req: Request, res: Response) => {
    const responseSessions = await getSessions();
    res.status(200).send(responseSessions)
}

const refreshTokenCtrl = (req: Request, res: Response) => {

    try {
        const { refreshToken } = req.body;
        if (refreshToken) {
            const expiresIn = 60 * 60 * 24 * 30;

            const uid = verifyRefreshToken(refreshToken)
            const token = generateToken(uid);


            res.status(200)
            res.send(token)

        }

    } catch (error) {
        console.log(error);

        res.status(400).send('Error on verify refreshToken')

    }
}


export { registerCtrl, loginCtrl, sessionListCtrl, refreshTokenCtrl }