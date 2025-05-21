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
    const { fullName, userName, address, phone, role } = req.body
    const file = req.file;
    const avatar = file?.filename ?? null;
    const result = await handleCreateUser(fullName, userName, address, phone, avatar)
}

const putUpdateUser = async (req: Request, res: Response) => {
    try {
        const { id, fullName, userName, address } = req.body;
        const result = await handleUpdateUser(id, fullName, userName, address)
        res.status(200).json({
            message: "User updated successfully",
            data: result
        })
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await handleDeleteUser(+id)

}

const postCreateFile = async (req: Request, res: Response) => {
    const file = req.file;
    console.log("file", file);

    if (!req.file) {
        res.status(400).json({
            message: "No file uploaded",
        })
    } else {
        res.status(200).json({
            message: "File uploaded successfully",
            file: file.filename,
        })
    }
}

export { getHomePage, postCreateUser, putUpdateUser, getUserById, deleteUser, postCreateFile }