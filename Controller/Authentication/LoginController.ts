import DBService from "../../Network_and_Database_Services/DBService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwtSecret = 'jwt-secret';
const LoginController = async (req : Request , res : Response) => {
    const {username, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (await bcrypt.compare(password, user!.password)){
            const token = jwt.sign(user!, jwtSecret, {expiresIn: '7d'});
            res.status(200).json({
                message: 'Login successful. Redirecting...',
                nama: username,
                token: token,
            });
        } else {
            res.status(401).json({error: 'Incorrect username or password'});
        }
    } catch (err) {
        res.status(500).json({error: 'Unknown error'});
    }
}

export default LoginController;