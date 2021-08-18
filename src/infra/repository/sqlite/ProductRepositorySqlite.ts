import _ from "lodash";
import { Product } from "../../../domain/entity/Product";
import ProductRepository from "../../../domain/repository/ProductRepository";
import DatabaseSQL from "../../database/DatabaseSQL";

export default class ProductRepositorySqlite implements ProductRepository {
  database: DatabaseSQL;

  constructor(database: DatabaseSQL) {
    this.database = database;
  }

  async getById(id: string): Promise<Product | undefined> {
    const productData = await this.database.one(
      "select * from products where id = ?",
      [id]
    );
    if (!productData) {
      throw new Error(`Product not found with id: ${id}`);
    }
    return new Product(
      productData.id,
      productData.name,
      productData.weight,
      {
        x: productData.dimensionX,
        y: productData.dimensionY,
        z: productData.dimensionZ,
      },
      productData.price
    );
  }

  async save(product: Product): Promise<Product> {
    return this.database.one(
      "insert into products (id, name, weight, dimensionX, dimensionY, dimensionZ, price) values (?, ?, ?, ?, ?, ?, ?)",
      [
        product.id,
        product.name,
        product.weight,
        product.dimensions.x,
        product.dimensions.y,
        product.dimensions.z,
        product.price,
      ]
    );
  }
}
