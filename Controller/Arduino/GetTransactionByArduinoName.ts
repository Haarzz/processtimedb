import {Request, Response} from "express";
import myPrismaClient from "../../MyPrismaClient";

export default async function GetTransactionByArduinoName(req : Request, res : Response) {
    try {
        const prisma = myPrismaClient;
        const namaArduino = req.params.nama_arduino;
        const transByArduino = await prisma.transaction.findMany({
            include: {                
                        group_id: true,
                        model_id: true,
                },
            where: {
              assign_arduino: namaArduino
            }
        });
        if (transByArduino == null) res.status(404).json({message: 'Transaction not found'})
        else res.json(transByArduino!);
    } catch (error : any) {
        res.status(500).json({message : error.toString()});
    }
}