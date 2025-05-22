import { prisma } from "../config/client"
import { ACCOUNT_TYPE } from "../config/constant";
import bcrypt from "bcrypt";
const saltRounds = 10;


const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users
}


const handleCreateUser = async (fullName: string, userName: string, address: string, password: string, avatar: string, phone: string, role: string) => {
    const defaultPassword = await bcrypt.hash(password, saltRounds)
    try {
        const newUser = await prisma.user.create({
            data: {
                fullName: fullName,
                userName: userName,
                address: address,
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                avatar: avatar,
                phone: phone,
                roleId: +role
            }
        })
        return newUser
    } catch (error) {
        console.log("error", error)
    }

}

const handleGetUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
}

const handleUpdateUser = async (id: string, fullName: string, address: string, avatar: string, phone: string, roleId) => {
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                fullName: fullName,
                address: address,
                phone: phone,
                roleId: +roleId,
                ...(avatar !== undefined && { avatar: avatar }),
            },
        })
        return updateUser
    } catch (error) {
        console.log("error", error);
        throw new Error("Database error: Failed to update user");
    }
}

const handleDeleteUser = async (id: number) => {
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        return deleteUser
    } catch (error) {
        console.log("error", error);
        throw new Error("Database error: Failed to delete user");
    }
}


export { handleCreateUser, getAllUsers, handleUpdateUser, handleGetUserById, handleDeleteUser, hashPassword }
