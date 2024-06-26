import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"

async function main(){
    const prisma = new PrismaClient();
    const password = await bcrypt.hash("admin" , 10);
    const createUser = await prisma.user.create({
        data: {
            username: "admin",
            password,
            arduinos: {
                createMany: {
                    data: [{nama_arduino: "Final Assembly 1"},
                    {nama_arduino: "Final Assembly 2"},
                    {nama_arduino: "Final Assembly 3"},
                            ]

                }
            }
        }
    })
    const createModel = await prisma.model.createMany({
        data: [
            {model_name: "Model Electric Fan 1"}, 
            {model_name: "Model Electric Fan 2"}, 
            {model_name: "Model Electric Fan 3"}, 
            {model_name: "Model Electric Fan 4"}, 
            {model_name: "Model Electric Fan 5"}, 
            {model_name: "Model Electric Fan 6"}, 
            
        ]
    })
    const createGroup = await prisma.group.createMany({
        data: [
            {group_name: "Group Assembly"},
            {group_name: "Group Motor 1"},
            {group_name: "Group Motor 2"},
            {group_name: "Group Motor 3"},
            {group_name: "Group Motor 4"},
            {group_name: "Group Motor 5"}
        ]
    })
    console.log(createUser)
    console.log(createModel)
    console.log(createGroup)
}
main();