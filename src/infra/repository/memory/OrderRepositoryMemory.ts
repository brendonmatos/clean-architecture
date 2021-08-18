import _ from "lodash";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
  items: Order[] = [];

  async getByCode(id: string): Promise<Order | undefined> {
    for (const order of this.items) {
      if (order.code.value === id) {
        return order;
      }
    }
    return undefined;
  }

  async save(order: Order): Promise<Order> {
    const newSize = this.items.push(order);
    if (!order.date) {
      debugger;
      throw new Error("Order date is not defined");
    }
    return order;
  }
  count(): Promise<number> {
    return Promise.resolve(this.items.length);
  }
}
