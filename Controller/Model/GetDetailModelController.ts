import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const GetDetailModelController = async (req : Request, res : Response) => {
    const detailModel = await prisma.transaction.findMany({
        select: {
            id: true
        } 
    })
}

export default GetDetailModelController;