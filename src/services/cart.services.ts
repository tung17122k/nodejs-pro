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


const putUpdateCartDetailService = async (data: { id: number; quantity: string }[], userId: number) => {


    if (data.length === 0) {
        return {
            updated: 0,
            sum: 0,
            message: "No cart details to update"
        };
    }

    const sum = data.reduce((total, item) => total + Number(item.quantity), 0);

    for (let i = 0; i < data.length; i++) {
        await prisma.cartDetail.update({
            where: {
                id: data[i].id
            },
            data: {
                quantity: +data[i].quantity
            }
        });
    }


    await prisma.cart.update({
        where: {
            userId: userId
        },
        data: {
            sum: sum
        }
    })

    const cart = await prisma.cart.findUnique({
        where: {
            userId
        },
        include: {
            cartDetails: true
        }
    })

    const totalPrice = cart.cartDetails.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    return {
        updated: data.length,
        sum: sum,
        userId: userId,
        message: "Cart detail updated successfully",
        totalPrice: totalPrice
    };
}

export { getCartDetailService, deleteProductInCartService, putUpdateCartDetailService };