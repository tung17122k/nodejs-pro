import { prisma } from "../config/client"


const handleCreateProduct = async (name: string, price: number, detailDesc: string, quantity: number, sold: number, factory: string, target: string, image: string) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: name,
                price: +price,
                detailDesc: detailDesc,
                quantity: +quantity,
                sold: sold,
                factory: factory,
                target: target,
                image: image
            }
        })
        return newProduct
    } catch (error) {
        console.log(">>>>>>error", error)
        throw new Error("Error creating product")
    }

}

const handlePutUpdateProduct = async (id: number, name: string, price: number, detailDesc: string, quantity: number, sold: number, factory: string, target: string, image: string) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: name,
                price: +price,
                detailDesc: detailDesc,
                quantity: +quantity,
                sold: sold,
                factory: factory,
                target: target,
                image: image
            }
        })
        return updatedProduct
    } catch (error) {
        console.log(">>>>>>error", error)
        throw new Error("Error updating product")
    }
}

const handleGetProduct = async () => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                id: 'desc'
            }
        })
        return products

    } catch (error) {
        console.log(">>>>>>error", error)
        throw new Error("Error getting product")
    }
}

const handleDeleteProduct = async (id: number) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: id
            }
        })
        return deletedProduct
    } catch (error) {
        console.log(">>>>>>error", error)
        throw new Error("Error deleting product")
    }
}

const handleGetProductById = async (id: number) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })
        return product
    } catch (error) {
        console.log(">>>>>>error", error)
        throw new Error("Error getting product by id")
    }
}


const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })



    if (cart) {
        // update cart
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })

        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        })


        return await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity
                },
            },
            create: {
                price: product?.price || 0,
                quantity: quantity,
                productId: productId,
                cartId: cart.id
            }

        })

    } else {
        // create new cart
        return await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetails: {
                    create: [
                        {
                            price: product?.price || 0,
                            quantity: quantity,
                            productId: productId
                        }
                    ]
                }
            }
        })
    }
}

export {
    handleCreateProduct, handlePutUpdateProduct, handleGetProduct, handleDeleteProduct, handleGetProductById, addProductToCart
}
