import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
const GetAllModelController = async (_req : Request, res: Response) => {
    const db = await DBService();
    db.query('SELECT * FROM proxim', (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            res.json(results);
        }
    });
}

export default GetAllModelController;