import { prisma } from "../config/client"


const handlePlaceOrder = async (userId: number, receiverName: string, receiverAddress: string, receiverPhone: string, totalPrice: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: userId
        },
        include: {
            cartDetails: true
        }
    })

    const dataOrderDetail = cart?.cartDetails.map(item => ({
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
    })) ?? []

    if (cart) {
        // create order
        const order = await prisma.order.create({
            data: {
                receiverName,
                receiverAddress,
                receiverPhone,
                paymentMethod: "COD",
                paymentStatus: "PAYMENT_UNPAID",
                status: "PENDING",
                totalPrice: totalPrice,
                userId,
                orderDetails: {
                    create: dataOrderDetail
                }
            }
        })

        // remove cart and cart-detail 
        await prisma.cartDetail.deleteMany({
            where: {
                cartId: cart.id
            }
        })

        await prisma.cart.delete({
            where: {
                id: cart.id
            }
        })


        return order;
    }

}

export {
    handlePlaceOrder
}