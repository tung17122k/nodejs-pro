import { prisma } from "../config/client"
import { comparePassword } from "./user.services"


const handleLogin = async (username: string, password: string, callback: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                userName: username
            }
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

export { handleLogin }