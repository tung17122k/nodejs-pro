import { prisma } from "../config/client"

const getCartDetailService = async (userId) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: {
                userId: userId
            }
        })
        console.log(">>>>>>>cart", cart);
        const cardId = cart?.id
        if (cardId) {
            const cartDetail = await prisma.cartDetail.findMany({
                where: {
                    cartId: cardId
                },
                include: {
                    product: true
                }

            })
            return cartDetail;
        } else {
            return [];
        }

    } catch (error) {
        throw new Error("Error getting cart detail");
    }
}

const deleteProductInCartService = async (cartDetailId: number, userId: number, sumCart: number) => {
    const cartDetail = await prisma.cartDetail.findUnique({
        where: {
            id: cartDetailId
        }
    })
    const cartDetailQuantity = cartDetail?.quantity || 0;
    // xoa cartDetail
    await prisma.cartDetail.delete({
        where: {
            id: cartDetailId
        }
    })



    if (sumCart === 1) {
        await prisma.cart.delete({
            where: {
                userId: userId
            }
        })
        return { success: true, deletedCart: true };
    } else {
        // update sum in cart
        const updatedCart = await prisma.cart.update({
            where: {
                userId: userId
            },
            data: {
                sum: {
                    decrement: cartDetailQuantity
                }
            }
        })
        return { success: true, cart: updatedCart };
    }

}

export { getCartDetailService, deleteProductInCartService };