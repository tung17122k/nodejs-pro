
import { User as PrismaUser, Role } from "@prisma/client";

declare global {
    namespace Express {
        interface User extends PrismaUser {
            role?: Role;
            sumCart?: number
        }
    }
}