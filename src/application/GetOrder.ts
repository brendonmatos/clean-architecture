import RepositoryFactory from "../domain/factory/RepositoryFactory";
import OrderRepository from "../domain/repository/OrderRepository";
import ProductRepository from "../domain/repository/ProductRepository";
import GetOrderInput from "./GetOrderInput";
import GetOrderOutput from "./GetOrderOutput";
export default class GetOrder {
  orderRepository: OrderRepository;
  productRepository: ProductRepository;
  constructor(repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.productRepository = repositoryFactory.createProductRepository();
  }

  public async execute(input: GetOrderInput): Promise<GetOrderOutput> {
    const order = await this.orderRepository.getByCode(input.code);
    if (!order) {
      throw new Error("Order not found");
    }
    const orderItems: any[] = [];
    for (const orderEntry of order.entries) {
      const product = await this.productRepository.getById(
        orderEntry.product.id
      );
      if (!product) {
        throw new Error("Product not found");
      }
      orderItems.push({
        itemName: product.name,
        price: product.price,
        quantity: orderEntry.quantity,
      });
    }

    return {
      code: order.code.value,
      freight: order.freight,
      total: order.total,
      orderItems,
    };
  }
}
