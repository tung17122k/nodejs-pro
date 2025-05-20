import { prisma } from "../config/client"
import getConnection from "../config/database"


const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users
}


const handleCreateUser = async (fullName: string, email: string, address: string) => {

    try {
        const newUser = await prisma.user.create({
            data: {
                name: fullName,
                email: email,
                address: address
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

const handleUpdateUser = async (id: string, fullName: string, email: string, address: string) => {
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: fullName,
                email: email,
                address: address
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


export { handleCreateUser, getAllUsers, handleUpdateUser, handleGetUserById, handleDeleteUser }
