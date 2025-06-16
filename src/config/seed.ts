import { hashPassword } from "../services/user.services";
import { prisma } from "./client"
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const count = await prisma.user.count();
    const countRole = await prisma.role.count();
    const defaultPassword = await hashPassword("123456")
    const countProduct = await prisma.product.count();

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
    if (countProduct === 0) {
        await prisma.product.createMany({
            data: [
                {
                    name: "Sản phẩm 1",
                    price: 100000,
                    detailDesc: "Mô tả chi tiết sản phẩm 1",
                    quantity: 10,
                    sold: 5,
                    factory: "Nhà máy A",
                    target: "Khách hàng A",
                    image: "2e95fa33-c417-41bc-aa8b-c84198185e29.png"
                },
                {
                    name: "Sản phẩm 2",
                    price: 200000,
                    detailDesc: "Mô tả chi tiết sản phẩm 2",
                    quantity: 20,
                    sold: 10,
                    factory: "Nhà máy B",
                    target: "Khách hàng B",
                    image: "2e95fa33-c417-41bc-aa8b-c84198185e29.png"
                }
            ]
        })
    }
    if (countRole !== 0 && count !== 0 && countProduct !== 0) {
        console.log(">>> ALREADY INIT DATA...");
    }
}

export default initDatabase