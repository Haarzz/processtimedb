import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
const IncrementTransactionController = async (req : Request, res : Response) => {
    const id = req.params.id;
    const queryUpdate = `
    UPDATE proxim 
    SET result = result + 1 
    WHERE ID = ${id}
  `;

    const db = await DBService();
    db.query(queryUpdate, (_err, _result) => {
        console.log('berhasil update data');
        res.json({message: 'Berhasil update data'});
    });

};

export default IncrementTransactionController;