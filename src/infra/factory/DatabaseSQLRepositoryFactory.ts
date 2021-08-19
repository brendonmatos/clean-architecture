import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import ProductRepository from "../../domain/repository/ProductRepository";
import DatabaseSqlite from "../database/DatabaseSqlite";
import CouponRepositorySqlite from "../repository/sqlite/CouponRepositorySqlite";
import OrderRepositorySqlite from "../repository/sqlite/OrderRepositorySqlite";
import ProductRepositorySqlite from "../repository/sqlite/ProductRepositorySqlite";

export default class DatabaseSQLRepositoryFactory implements RepositoryFactory {
  createProductRepository(): ProductRepository {
    return new ProductRepositorySqlite(DatabaseSqlite.getInstance());
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositorySqlite(DatabaseSqlite.getInstance());
  }
  createOrderRepository(): OrderRepository {
    return new OrderRepositorySqlite(DatabaseSqlite.getInstance());
  }
}
