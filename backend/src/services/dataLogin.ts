// AuthService
import { Session } from "../interfaces/session.interface";
import SessionModel from "../models/session";

// const registerNewUser = async (authUser: Auth) => {
const registerDataLogin = async ({ type, rut, password}: Session) => {
    const saveDataLogin = await SessionModel.create({ type, rut, password})
    return saveDataLogin;
}

export { registerDataLogin }