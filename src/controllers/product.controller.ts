import { NextFunction, Request, Response } from "express";
import { handleCreateProduct } from "../services/product.services";
import { ProductSchema, TProductSchema } from "../validation/product.schema";

const postCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, quantity, sold, factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    console.log(">>>>validate", validate);
    if (validate.success === false) {
        //error 
        const errorsZod = validate.error.issues;
        console.log(">>>>errorsZod", errorsZod);

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
    }
    try {
        if (validate.success) {
            const file = req.file;
            const image = file?.filename ?? null;
            const result = await handleCreateProduct(name, +price, detailDesc, +quantity, sold, factory, target, image)
            if (result) {
                res.status(200).json({
                    message: "Product created successfully",
                    data: result
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Error creating product"
        });
    }

}

export {
    postCreateProduct
}