import { NextFunction, Request, Response } from "express";
import { handleCreateProduct, handlePutUpdateProduct, handleGetProduct, handleDeleteProduct, handleGetProductById, addProductToCart } from "../services/product.services";
import { ProductSchema, TProductSchema } from "../validation/product.schema";
import { getUserSumCard } from "../services/auth.services";

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
            const result = await handleCreateProduct(name, +price, detailDesc, +quantity, +sold, factory, target, image)
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

const putUpdateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, detailDesc, quantity, sold, factory, target } = req.body as TProductSchema;
        const validate = ProductSchema.safeParse(req.body);
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
        } else {
            const file = req.file;
            const image = file?.filename ?? null;
            const result = await handlePutUpdateProduct(+id, name, +price, detailDesc, +quantity, +sold, factory, target, image)
            if (result) {
                res.status(200).json({
                    message: "Product created successfully",
                    data: result
                });
            }
        }

    } catch (error) {

    }
}

const getProduct = async (req: Request, res: Response) => {
    try {
        const products = await handleGetProduct();
        res.status(200).json({
            message: "Get product successfully",
            data: products
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Error getting product"
        });
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: "Product ID is required"
        });
    }
    try {
        const result = await handleDeleteProduct(+id);
        res.status(200).json({
            message: "Product deleted successfully",
            data: result
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Error deleting product"
        });
    }
}

const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: "Product ID is required"
        });
    }
    try {
        const product = await handleGetProductById(+id);
        res.status(200).json({
            message: "Get product successfully",
            data: product
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Error getting product"
        });
    }
}

const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("checkid", id);

    const user = req.user;

    if (!user) {
        res.status(401).json({ message: "Unauthorized user" });
    }
    try {
        const result = await addProductToCart(1, +id, user);
        const updatedSum = await getUserSumCard(user.id);
        req.user.sumCart = updatedSum

        res.status(200).json({ message: "Product added to cart", sumCart: updatedSum });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }


}


export {
    postCreateProduct, putUpdateProduct, getProduct, deleteProduct, getProductById, postAddProductToCart
}