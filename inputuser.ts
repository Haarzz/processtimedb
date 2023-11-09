import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"

async function main(){
    const prisma = new PrismaClient();

    // ANGGAP saja ini dari user
    const plan = 0;
    const transactiona = await prisma.transaction.create({
        data: {
            plan,
            actual: 0,
            
            
        }
    })
}
main()