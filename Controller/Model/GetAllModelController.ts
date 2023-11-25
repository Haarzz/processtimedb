import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
import myPrismaClient from "../../MyPrismaClient";
const prisma = myPrismaClient;
const GetAllModelController = async (req : Request, res: Response) => {
    try {
        const allModel = await prisma.powermeter.findMany()
        res.json(allModel);
    } catch (err) {
        console.log(err);
    }
}

export default GetAllModelController;