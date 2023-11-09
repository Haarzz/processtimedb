import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const usera = await prisma.arduino.findMany({
        where: {
            usernameId : "hasbi"
        } 
    });

    const user = await prisma.user.findMany({
        select : {
            arduinos: {
                select: {
                    assigned_transaction: {
                        select: {
                            model:  true,
                            plan: true,
                            group: true,
                            actual: true,
                            created_at: false
                        }
                    }
                }
            }
        }
    })
    console.log(user)
}
main();
