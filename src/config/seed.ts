import { prisma } from "./client"

const initDatabase = async () => {
    const count = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (count === 0) {
        await prisma.user.createMany({
            data: [
                {
                    userName: 'Tung',
                    password: '123456',
                    accountType: 'SYSTEM'
                },
                {
                    userName: 'Tung2',
                    password: '1234567',
                    accountType: 'SYSTEM'
                }
            ]
        })
    } else if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: 'ADMIN',
                    description: 'Quản trị viên'
                },
                {
                    name: 'USER',
                    description: 'Người dùng'
                }
            ]
        })

    } else {
        console.log("Database already seeded");

    }

}

export default initDatabase