import Order from "../entity/Order";

export default interface OrderRepository {
  getByCode(id: string): Promise<Order | undefined>;
  save(order: Order): Promise<Order>;
  count(): Promise<number>;
  clean(): Promise<void>;
}
