import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const GetAllModelController = async (_req : Request, res: Response) => {
    try {
        const allModel = await prisma.proxim.findMany();
        res.json(allModel);
    } catch (err) {
        console.log(err);
    }
}

export default GetAllModelController;