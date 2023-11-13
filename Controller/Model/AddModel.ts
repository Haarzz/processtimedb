import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const AddModel = async (req: Request , res: Response) => {
    const { modelname } = req.body;
    try {
        const AddModel = await prisma.model.createMany({
            data: [
                {model_name: modelname}
            ]
        })
        res.json(AddModel)
    } catch (error) {
        res.status(401).json("Error Adding Model");
        console.log(error);
    }
}
export default AddModel;