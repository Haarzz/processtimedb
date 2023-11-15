import {Request, Response} from "express";
import myPrismaClient from "../../MyPrismaClient";

export default async function GetDetailArduinoController(req : Request, res : Response) {
    try {
        const prisma = myPrismaClient;
        const namaArduino = req.params.nama_arduino;
        const arduino = await prisma.arduino.findUnique({
            include: {
                assigned_transactionId: {
                    include: {
                        group_id: true,
                        model_id: true,
                    }
                }
            },
            where: {
              nama_arduino: namaArduino
            }
        });
        if (arduino == null) res.status(404).json({message: 'Nama arduino tidak ditemukan'})
        else res.json(arduino!);
    } catch (error : any) {
        res.status(500).json({message : error.toString()});
    }
}