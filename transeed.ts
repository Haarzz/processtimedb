import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"

async function main(){
    const prisma = new PrismaClient();
    const createTrans = await prisma.transaction.create({
        data: {id_model: 1,
            id_group: 2,
            plan: 500,
            actual: 0,
            } 
})
    const updateArduino = await prisma.arduino.update({
        where: {
            nama_arduino: "Aida"
        },
        data: {
            assigned_transaction: createTrans.id
        }
    })
    console.log(createTrans)
    console.log(updateArduino)
}

main();
