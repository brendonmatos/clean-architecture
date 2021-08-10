import { Product } from "./Product";
import ProductRepository from "./ProductRepository";

export default class ProductRepositoryMemory implements ProductRepository{
    items: { [key: string]: Product };
    
    constructor(){
        this.items = {
            "1": new Product("barbeador", 100, { x: 5, y: 5, z: 10 }, 9000),
            "2": new Product("camera", 1_000, {x: 20, y: 15, z: 10}, 200),
            "3": new Product("guitar", 3_000, {x: 100, y: 30, z: 10}, 200),
            "4": new Product("geladeira", 40_000, {x: 200, y: 100, z: 50}, 200),
        }
    }

    async getById(id): Promise<Product>{
        return this.items[id];
    }
}