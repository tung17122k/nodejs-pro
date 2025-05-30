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

export {
    handleCreateProduct, handlePutUpdateProduct, handleGetProduct, handleDeleteProduct
}
