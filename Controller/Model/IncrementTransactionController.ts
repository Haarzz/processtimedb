import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IncrementTransactionController = async (req : Request, res : Response) => {
    const id = req.params.id;
    const intID = parseInt(id, 10);
    const updateQuery = await prisma.proxim.update({
      where: {
        ID : intID
      }, data: {
         result: {
          increment: 1,
         }
      }
      
    })
    res.json(updateQuery);
};

export default IncrementTransactionController;