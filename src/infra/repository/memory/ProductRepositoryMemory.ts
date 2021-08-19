import { Product } from "../../../domain/entity/Product";
import ProductRepository from "../../../domain/repository/ProductRepository";

export default class ProductRepositoryMemory implements ProductRepository {
  items: { [key: string]: Product };
  static instance: ProductRepositoryMemory;
  private constructor() {
    this.items = {
      "1": new Product("1", "barbeador", 100, { x: 5, y: 5, z: 10 }, 9000),
      "2": new Product("2", "camera", 1_000, { x: 20, y: 15, z: 10 }, 200),
      "3": new Product("3", "guitar", 3_000, { x: 100, y: 30, z: 10 }, 200),
      "4": new Product(
        "4",
        "geladeira",
        40_000,
        { x: 200, y: 100, z: 50 },
        200
      ),
    };
  }

  static getInstance() {
    if (!ProductRepositoryMemory.instance) {
      ProductRepositoryMemory.instance = new ProductRepositoryMemory();
    }
    return ProductRepositoryMemory.instance;
  }

  async getById(id: string): Promise<Product> {
    return this.items[id];
  }
}
