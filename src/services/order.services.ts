import { error } from "console"
import { prisma } from "../config/client"


const handlePlaceOrder = async (userId: number, receiverName: string, receiverAddress: string, receiverPhone: string, totalPrice: number) => {
    let arrayProduct = [];

    const result = await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({
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
            const order = await tx.order.create({
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
            await tx.cartDetail.deleteMany({
                where: {
                    cartId: cart.id
                }
            })

            await tx.cart.delete({
                where: {
                    id: cart.id
                }
            })

            for (let i = 0; i < cart.cartDetails.length; i++) {
                const productId = cart.cartDetails[i].productId
                // console.log("productId", productId);

                const product = await tx.product.findUnique({
                    where: {
                        id: productId
                    }
                })
                // console.log("product", product);

                if (!product || product.quantity < cart.cartDetails[i].quantity) {
                    throw new Error(`San pham ${product?.name} không tồn tại hoặc không đủ số lượng`)

                } else {
                    const productResult = await tx.product.update({
                        where: {
                            id: productId
                        },
                        data: {
                            quantity: {
                                decrement: Number(cart.cartDetails[i].quantity)
                            },
                            sold: {
                                increment: Number(cart.cartDetails[i].quantity)
                            }
                        }
                    })
                    arrayProduct.push(productResult)
                }
            }
            console.log("arrayProduct>>>", arrayProduct);

            return arrayProduct
        }
    })
    // console.log("result", result);

    return result
}


const getOrderHistoryService = async (userId: number) => {

    const result = await prisma.order.findMany({
        where: {
            userId
        },
        include: {
            orderDetails: {
                include: {
                    product: true
                }
            }
        }
    })

    return result





}

export {
    handlePlaceOrder, getOrderHistoryService
}