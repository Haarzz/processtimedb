import myPrismaClient from "./MyPrismaClient";

async function main() {
    const prisma = myPrismaClient;
    const powerCreator = await prisma.powermeter.createMany({
        data: {
            voltage: Math.floor(Math.random() * 10.35) + 210,
            ampere:Math.floor(Math.random() * 10) + 100,
            power: Math.floor(Math.random() * 20) + 50,
            frequency: Math.floor(Math.random() * 10) + 50,
        }
    })
    console.log({powerCreator})
}
main();