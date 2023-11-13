import bcrypt from "bcrypt";
import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const RegisterController = async (req : Request, res : Response) => {
    
    try {
        console.log(req.body)
        const {username, password } = req.body;
        console.log(req.body.arduinoName)
        const arduinoNameList = req.body.arduinoName.map((value : any) => {return {nama_arduino: value.name}});
        console.log(arduinoNameList)
        const HashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password : HashedPassword,
                arduinos: {
                    createMany : {
                        data: arduinoNameList
                    }
                }
            }
        })
        res.json(user);
    } catch (error) {
        console.error('Hashing error: ', error);
        res.status(500).json({error: 'Registration failed'});
    }
}

export default RegisterController;