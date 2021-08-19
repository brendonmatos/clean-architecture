import CouponRepository from "../repository/CouponRepository";
import OrderRepository from "../repository/OrderRepository";
import ProductRepository from "../repository/ProductRepository";

export default interface RepositoryFactory {
  createProductRepository(): ProductRepository;
  createOrderRepository(): OrderRepository;
  createCouponRepository(): CouponRepository;
}
