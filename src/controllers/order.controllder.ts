import { Request, Response, NextFunction } from "express";
import { handlePlaceOrder } from "../services/order.services";


const postCheckout = async (req: Request, res: Response) => {

    const userId = req?.user.id
    const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body
    const result = await handlePlaceOrder(userId, receiverName, receiverAddress, receiverPhone, +totalPrice)

    if (result) {
        res.status(201).json({
            message: "Đặt hàng thành công",
            data: result
        })
    } else {
        res.status(400).json({
            message: "Đặt hàng thất bại"
        })
    }

}

export { postCheckout };