import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1",
        }),
    detailDesc: z.string().trim().min(1, { message: "Detail description is required" }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số lượng tối thiểu là 1",
        }),
    sold: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num >= 0, {
            message: "Đã bán được thiểu là 0",
        }),
    factory: z.string().trim().min(1, { message: "Factory is required" }),
    target: z.string().trim().min(1, { message: "Target is required" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;