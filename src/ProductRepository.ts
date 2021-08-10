import { Product } from "./Product";

export default interface ProductRepository {
    getById(id: string): Promise<Product>
}