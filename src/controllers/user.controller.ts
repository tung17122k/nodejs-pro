import { NextFunction, Request, Response } from "express";
import { handleCreateUser, getAllUsers, handleUpdateUser, handleGetUserById, handleDeleteUser } from "../services/user.services";

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.status(200).json({
        data: users
    })
}

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await handleGetUserById(+id)
    res.status(200).json({
        data: user
    })
}




const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body
    const result = await handleCreateUser(fullName, email, address)

}

const putUpdateUser = async (req: Request, res: Response) => {
    try {
        const { id, fullName, email, address } = req.body;
        const result = await handleUpdateUser(id, fullName, email, address)

    } catch (error) {
        console.error("Error updating user:", error);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await handleDeleteUser(+id)

}

export { getHomePage, postCreateUser, putUpdateUser, getUserById, deleteUser }