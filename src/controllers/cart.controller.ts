import { Request, Response, NextFunction } from "express";
import { getCartDetailService, deleteProductInCartService, putUpdateCartDetailService } from "../services/cart.services";


const getCartDetail = async (req: Request, res: Response) => {


    const id = req.user?.id;

    const result = await getCartDetailService(id)

    const total = result.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);



    res.status(200).json({ message: "Get cart detail successfully", data: result, total: total });
}


const deleteProductInCart = async (req: Request, res: Response) => {

    const id = req.params.id
    const userId = req.user?.id;
    const sumCart = req.user?.sumCart;


    const result = await deleteProductInCartService(+id, userId, sumCart)


    res.status(200).json({ message: "Delete Product in Cart successfully", data: result });
}

const putUpdateCartDetailArray = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const currentCartDetail: { id: number; quantity: string }[] = req.body?.cartDetails ?? []



    const result = await putUpdateCartDetailService(currentCartDetail, userId)

    res.status(200).json({ message: "Update cart detail successfully", data: result });



}


export { getCartDetail, deleteProductInCart, putUpdateCartDetailArray };