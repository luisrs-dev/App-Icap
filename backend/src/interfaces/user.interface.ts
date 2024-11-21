import { Auth } from "./auth.interface";

export interface User extends Auth{
    _id: string;
    rut: string;
    name: string;
    email: string;
}