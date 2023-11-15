import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const InputNewTransactionController = async (req : Request, res : Response) => {
    try {
        const {group_id, model_id, plan, arduino} = req.body;
        const intPlan = parseInt(plan , 10);
        console.log('req body : ' , req.body)
        const createTrans = await prisma.transaction.create({
            data: {id_model: model_id,
                id_group: group_id,
                plan: intPlan,
                actual: 0,
                assign_arduino: arduino,
                } 
        })
        console.log('disini berhasil ' , arduino)
        await prisma.arduino.update({
            where: {
                nama_arduino: arduino
            },
            data: {
                assigned_transaction: createTrans.id,
            }
        })
        res.json({message: "Sukses buat transaksi"})

        
    }catch (err){
        console.log(err)
        res.status(500).json("Error Input Data")
    }
};
export default InputNewTransactionController;
