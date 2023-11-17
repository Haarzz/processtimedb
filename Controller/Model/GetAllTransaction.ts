import myPrismaClient from "../../MyPrismaClient";
import { Request, Response } from "express";

const prisma = myPrismaClient;
const GetAllTransaction =async (req:Request , res:Response) => {
    try {
        const allTransaction = await prisma.transaction.findMany({
            select: {
                id: true,
                group_id: {
                    select: {
                        group_name: true
                    }
                },
                model_id: {
                    select: {
                        model_name: true
                    }
                },
                plan: true ,
                actual: true,
                assign_arduino: true,
                created_at: true,
                arduinos: true,   
            },
        })
        res.json(allTransaction)
    } catch (error) {
        console.log(error)
    }
}
export default GetAllTransaction;