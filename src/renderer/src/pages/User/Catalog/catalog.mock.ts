import { IProduct } from "@models/product";

const mockProducts: IProduct[] = [];
for(let i = 0; i < 50; i++){
    mockProducts.push({
        _id: `${i + 1}`,
        name: `Name ${i + 1}`,
        description: `Description ${i + 1}`,
        image: `path ${i + 1}`,
        price: Math.round(Math.random() * 990 + 10)
    })
}

export {mockProducts};
