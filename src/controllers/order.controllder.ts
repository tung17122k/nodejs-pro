import { Request, Response, NextFunction } from "express";
import { handlePlaceOrder, getOrderHistoryService } from "../services/order.services";


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

const getOrderHistory = async (req: Request, res: Response) => {
    const userId = req?.user.id

    const result = await getOrderHistoryService(userId)

    if (result) {
        res.status(200).json({
            message: "Lấy lịch sử đơn hàng thành công",
            data: result
        })
    }
}


export { postCheckout, getOrderHistory };