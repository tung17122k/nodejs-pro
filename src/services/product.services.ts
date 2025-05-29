import { prisma } from "../config/client"


const handleCreateProduct = async (name: string, price: number, detailDesc: string, quantity: number, sold: string, factory: string, target: string, image: string) => {
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

export {
    handleCreateProduct
}
