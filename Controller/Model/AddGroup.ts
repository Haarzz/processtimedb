import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const AddGroup = async (req: Request , res: Response) => {
    const { groupname } = req.body;
    try {
        const AddGroup = await prisma.group.createMany({
            data: [
                {group_name: groupname}
            ]
        })
        res.json(AddGroup)
    } catch (error) {
        res.status(401).json("Error Adding Group");
        console.log(error);
    }
}
export default AddGroup ;