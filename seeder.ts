import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

async function main(){
    const prisma = new PrismaClient()

    const password = await bcrypt.hash('admin', 10);
    await prisma.db_login.create({
        data: {
            username: 'budi',
            password,
            userprofile: 'hasbi'
        }
    })
    console.log("Berhasil Add user")
}

main().catch(err => console.log(err));
