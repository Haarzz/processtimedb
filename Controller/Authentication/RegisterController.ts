import bcrypt from "bcrypt";
import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const RegisterController = async (req : Request, res : Response) => {
    const {username, password} = req.body;
    try {
        const HashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.db_login.create({
            data: {
                username,
                password : HashedPassword,
                userprofile : username,
            }
        })
        res.json(user);
    } catch (error) {
        console.error('Hashing error: ', error);
        res.status(500).json({error: 'Registration failed'});
    }
}

export default RegisterController;