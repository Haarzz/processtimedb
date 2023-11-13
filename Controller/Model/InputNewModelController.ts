import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const InputNewModelController = async (req : Request, res : Response) => {
    try {
        const {group, model, plan} = req.body;
        const intPlan = parseInt(plan , 10);
        const formInput = await prisma.transaction.create({
            data: {
                id_model : model,
                id_group : group,
                plan : intPlan,
                actual : 0
            }
        })
        res.json(formInput)
    }catch (err){
        console.log(err)
        res.status(500).json("Error Input Data")
    }
};
export default InputNewModelController;