import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const GetFormData = async (req : Request, res : Response) => {
    const username = req.params.username;
    const allModel = await prisma.model.findMany({
    })
    const allGroup = await prisma.group.findMany({
    })
    const allArduino = await prisma.arduino.findMany({
        include: {
            assigned_transactionId: {
                include: {
                    group_id: true,
                    model_id: true,
                }
            }
        },
        where: {
          username
        }
    });
    res.json({allModel, allGroup, allArduino})
}
export default GetFormData;

