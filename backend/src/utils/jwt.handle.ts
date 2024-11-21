import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { CookieSerializeOptions } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || "token.01010";
const JWT_REFRESH = process.env.JWT_REFRESH || "token.refresh.01010";

const generateToken = (id: string) => {
    const jwt = sign( {id}, JWT_SECRET, {
        expiresIn: "2h"
    })

    return jwt;
} 

const generateRefreshToken = (uid: string, email: string ) => {
    const expiresIn = 60* 60 * 24 * 30;
    try {
        const refreshToken = sign( {uid, email}, JWT_REFRESH, {expiresIn} );
        return refreshToken;
    } catch (error) {
        console.log(error);
        
    }
}

const verifyToken = (jwt:string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
}

const verifyRefreshToken = (refreshToken: string): string => {
    const isOk = verify(refreshToken, JWT_REFRESH);
    if (typeof isOk === 'string') {
        return isOk;
      } else {
        return isOk.uid;
      }
}

export { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken }