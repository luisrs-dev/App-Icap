import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { getSessions } from "../services/sessions";

const getItems = async (req: Request, res: Response) => {
    try {
        const response = await getSessions();
        res.send(response);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEMS')
    }
}

export { getItems }