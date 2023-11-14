import { PrismaClient } from "@prisma/client";
async function main(){
    const prisma = new PrismaClient();
    const arduinoWithTransaksi = await prisma.arduino.findMany({
        include: {
            assigned_transactionId: {
                include: {
                    group_id: true,
                    model_id: true,
                }
            }
        }

    });
    console.log(arduinoWithTransaksi)
    

}

main().catch(err => console.log(err))