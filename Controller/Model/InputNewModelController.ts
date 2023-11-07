import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const InputNewModelController = async (req : Request, res : Response) => {
    try {
        const formData = req.body;
        const intPlan = parseInt(formData.plan , 10);
        const formInput = await prisma.proxim.create({
            data: {
                groupname : formData.group,
                modelname : formData.model,
                plan : intPlan,
                result : 0
            }
        })
        res.json(formInput)
    }catch (err){
        console.log(err)
        res.status(500).json("Error Input Data")
    }
};
export default InputNewModelController;