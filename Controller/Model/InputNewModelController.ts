import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const InputNewModelController = async (req : Request, res : Response) => {
    try {
        const {group_id, model_id, plan, arduino} = req.body;
        const intPlan = parseInt(plan , 10);
        const createTrans = await prisma.transaction.create({
            data: {id_model: model_id,
                id_group: group_id,
                plan: intPlan,
                actual: 0,
                } 
    })
        const updateArduino = await prisma.arduino.update({
            where: {
                nama_arduino: arduino
            },
            data: {
                assigned_transaction: createTrans.id
            },
            include: {
                assigned_transactionId: true
            }
        })

        
    }catch (err){
        console.log(err)
        res.status(500).json("Error Input Data")
    }
};
export default InputNewModelController;
// async function main(){
//     const prisma = new PrismaClient();

//     console.log(createTrans)
//     console.log(updateArduino)
// }

// main();
