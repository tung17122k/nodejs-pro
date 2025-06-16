import { z } from "zod";
import { isEmailExist } from "../services/user.services";



const emailSchema = z.string().email({ message: "Email is invalid" }).refine(async (email) => {
    const existingUsers = await isEmailExist(email);
    return !existingUsers;
}, { message: "Email already exists" });

const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter",
    })

export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, { message: "Name is required" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;