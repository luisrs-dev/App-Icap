// AuthService
import { Response } from "express";
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateRefreshToken, generateToken } from "../utils/jwt.handle";
import { registerDataLogin } from "./dataLogin";

// const registerNewUser = async (authUser: Auth) => {
const registerNewUser = async ({
  rut,
  email,
  name,
  password,
}: User) => {
  const checkIs = await UserModel.findOne({ email });
  if (checkIs) return "ALREDY_USER";

  const passHash = await encrypt(password);
  console.log("no existe");

  const registerNewUser = await UserModel.create({
    rut,
    name,
    email,
    password: passHash
  });
  return registerNewUser;
};

const loginUser = async ({ rut, password }: Auth, res: Response) => {
  const checkIs = await UserModel.findOne({ rut });
  if (!checkIs) {
    await registerDataLogin({ type: "Usuario no registrado", rut, password });
    return "NOT_FOUND_USER";
  }

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) {
    await registerDataLogin({ type: "Contraseña incorrecta", rut, password });
    return "PASSWORD_INCORRECT";
  }

 

  const token = generateToken(checkIs.email);
  const data = {
    token,
    user: checkIs
  };
  await registerDataLogin({ type: "Inicio de sesión", rut, password });
  return data;
};

export { loginUser, registerNewUser };
