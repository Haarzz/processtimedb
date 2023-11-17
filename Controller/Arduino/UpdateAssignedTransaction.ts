import {Request, Response} from "express";
import myPrismaClient from "../../MyPrismaClient";

export default async function UpdateAssignedTransaction(req : Request, res : Response) {
    try {
        const prisma = myPrismaClient;
        const namaArduino = req.body.nama_arduino;
        const updateAssign = parseInt(req.body.trans_id, 10) 
        const updatedArduino = await prisma.arduino.update({
            include: {
                assigned_transactionId: {
                    include: {
                        group_id: true,
                        model_id: true,
                    }
                }
            }, where: {
                nama_arduino: namaArduino,
            },data: {
                assigned_transaction: updateAssign
            }
        });
        if (updatedArduino == null) res.status(404).json({message: 'Transaction not found'})
        else res.json(updatedArduino!);
    } catch (error : any) {
        res.status(500).json({message : error.toString()});
    }
}