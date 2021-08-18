import OrderRepository from "../domain/repository/OrderRepository";
import GetOrderInput from "./GetOrderInput";
import GetOrderOutput from "./GetOrderOutput";
export default class GetOrder {
  orders: OrderRepository;
  constructor({ orders }: { orders: OrderRepository }) {
    this.orders = orders;
  }

  public async execute(input: GetOrderInput): Promise<GetOrderOutput> {
    const order = await this.orders.getByCode(input.code);
    if (!order) {
      throw new Error("Order not found");
    }
    return {
      code: order.code.value,
      clientCPF: order.client.cpf.value,
      discount: order.discountTotal,
      items: order.entries.map((entry) => ({
        price: entry.getTotal(),
        quantity: entry.quantity,
      })),
      freightTotal: order.freight,
      total: order.total,
      deliveryCEP: order.deliveryCEP,
    };
  }
}
