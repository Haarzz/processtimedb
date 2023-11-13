import DBService from "../../Network_and_Database_Services/DBService";
import bcrypt from "bcrypt";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ChangePassword = async (req : Request, res : Response) => {
  const { username, oldPassword, newPassword } = req.body;
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        username,
      }
    })
    const isPasswordValid = await bcrypt.compare(oldPassword, findUser!.password);

    if (isPasswordValid) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const updatePasswordQuery = await prisma.user.update({
        where: {
          username,
        }, data: {
          password: hashedNewPassword
        }
      })
      res.json(updatePasswordQuery);
    }
    else {
      res.status(401).json({ message: 'Incorrect old password' });
    }
  } catch (err){
    console.log(err);
    res.status(500).json({message: "Error Changing Password"})
  }
}

export default ChangePassword;