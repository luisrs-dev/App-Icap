import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { getSessions } from "../services/sessions";
import { getUsers } from "../services/user";

const getItems = async (req: Request, res: Response) => {
    try {
        const response = await getUsers();
        res.send(response);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_USERS')
    }
}

export { getItems }