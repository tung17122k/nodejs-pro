import { NextFunction, Request, Response } from "express";
import { handleCreateUser, getAllUsers, handleUpdateUser, handleGetUserById, handleDeleteUser, handleRegister } from "../services/user.services";
import { RegisterSchema, TRegisterSchema } from "../validation/register.schema";

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
    const { fullName, userName, address, password, phone, role } = req.body
    const file = req.file;
    const avatar = file?.filename ?? null;
    const result = await handleCreateUser(fullName, userName, address, password, avatar, phone, role)
    if (result) {
        res.status(200).json({
            message: "User created successfully",
            data: result
        })
    }
}

const putUpdateUser = async (req: Request, res: Response) => {
    try {
        const { id, fullName, userName, address, phone, roleId } = req.body
        if (!id) {
            res.status(400).json({
                message: "User ID is required"
            })
        }
        const idNoExist = await handleGetUserById(+id)
        if (!idNoExist) {
            res.status(404).json({
                message: "User not found"
            })
        }

        const file = req.file;
        const avatar = file?.filename ?? undefined;
        const result = await handleUpdateUser(id, fullName, address, avatar, phone, roleId)
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
    const idNoExist = await handleGetUserById(+id)
    if (!idNoExist) {
        res.status(404).json({
            message: "User not found"
        })
    }
    if (!id) {
        res.status(400).json({
            message: "User ID is required"
        })
    }

    const result = await handleDeleteUser(+id)
    res.status(200).json({
        message: "User deleted successfully",
        data: result
    })

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

const postRegister = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body as TRegisterSchema;
    console.log("Register data:", req.body);

    try {
        const validate = await RegisterSchema.safeParseAsync(req.body);
        if (!validate.success) {
            const errorsZod = validate.error.issues;
            const errors = errorsZod?.map((error) => {
                return {
                    field: error.path.join('.'),
                    message: error.message
                }
            })
            res.status(400).json({
                message: "Validation error",
                errors: errors
            });
        } else {
            const result = await handleRegister(fullName, email, password);
            if (result) {
                res.status(200).json({
                    message: "User registered successfully",
                    data: result
                });
            } else {
                res.status(400).json({
                    message: "User registration failed"
                });
            }
        }
    } catch (error) {
        console.log("Validation error:", error);
        res.status(500).json({
            message: "Internal server error"
        });

    }

}

export { getHomePage, postCreateUser, putUpdateUser, getUserById, deleteUser, postCreateFile, postRegister }