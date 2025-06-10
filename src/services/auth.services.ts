import { prisma } from "../config/client"
import { comparePassword } from "./user.services"


const handleLogin = async (username: string, password: string, callback: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                userName: username
            },
            include: { role: true },
        })

        if (!user) {
            return callback(null, false, { message: `User ${username} not found` });
        }
        // compare password
        const isMatch = await comparePassword(password, user.password)

        if (!isMatch) {
            return callback(null, false, { message: `Incorrect password` });
        }


        return callback(null, user, { message: "Login successful" });
    } catch (error) {
        // Handle error
        callback(error, false, { message: "An error occurred during login" });
        console.log(">>>>>>error", error)
    }

}


const handleGetUserWithRoleById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            role: true
        },
        omit: {
            password: true
        }
    })
    return result
}

export { handleLogin, handleGetUserWithRoleById }