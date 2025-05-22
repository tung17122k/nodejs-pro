import { hashPassword } from "../services/user.services";
import { prisma } from "./client"
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const count = await prisma.user.count();
    const countRole = await prisma.role.count();
    const defaultPassword = await hashPassword("123456")

    if (countRole === 0) {
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
    }
    if (count === 0) {
        const adminRole = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        })
        if (adminRole)
            await prisma.user.createMany({
                data: [
                    {
                        fullName: 'Admin',
                        userName: 'Tung',
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id,
                    },
                    {
                        fullName: "Admin",
                        userName: 'Tung2',
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id,
                    }
                ]
            })
    }
    if (countRole === 0 && count === 0) {
        console.log("Database already seeded");
    }
}

export default initDatabase