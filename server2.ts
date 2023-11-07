import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const model = await prisma.proxim.create({
        data: {modelname: "ModelPrisma", groupname: "GroupPrisma" , plan: 500, result: 0 }
    })
    console.log(model);
}
main();
