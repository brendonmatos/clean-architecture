import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import ProductRepository from "../../domain/repository/ProductRepository";
import DatabaseSqlite from "../database/DatabaseSqlite";
import CouponRepositoryMemory from "../repository/memory/CouponRepositoryMemory";
import OrderRepositoryMemory from "../repository/memory/OrderRepositoryMemory";
import ProductRepositoryMemory from "../repository/memory/ProductRepositoryMemory";
import CouponRepositorySqlite from "../repository/sqlite/CouponRepositorySqlite";
import OrderRepositorySqlite from "../repository/sqlite/OrderRepositorySqlite";
import ProductRepositorySqlite from "../repository/sqlite/ProductRepositorySqlite";

export default class MemoryRepositoryFactory implements RepositoryFactory {
  createProductRepository(): ProductRepository {
    return ProductRepositoryMemory.getInstance();
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory();
  }
  createOrderRepository(): OrderRepository {
    return OrderRepositoryMemory.getInstance();
  }
}
