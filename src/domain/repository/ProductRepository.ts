import { Product } from "../entity/Product";

export default interface ProductRepository {
  getById(id: string): Promise<Product>;
}
