import _ from "lodash";
import Coupon from "../../../domain/entity/Coupon";
import Order from "../../../domain/entity/Order";
import OrderEntry from "../../../domain/entity/OrderEntry";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DatabaseSQL from "../../database/DatabaseSQL";

export default class OrderRepositorySqlite implements OrderRepository {
  database: DatabaseSQL;

  constructor(database: DatabaseSQL) {
    this.database = database;
  }

  async getByCode(code: string): Promise<Order | undefined> {
    const orderData = await this.database.one(
      "select * from orders where id = ?",
      [code]
    );
    const orderItemsData = await this.database.many(
      "select * from order_entries where orderId = ?",
      [code]
    );
    const order = new Order(
      { cpf: orderData.clientCpf },
      new Date(orderData.date),
      orderData.serial
    );
    for (const orderItemData of orderItemsData) {
      order.addEntry(
        new OrderEntry({
          product: orderItemData.product,
          quantity: orderItemData.quantity,
        })
      );
    }
    if (orderData.couponCode) {
      const couponData = await this.database.one(
        "select * from coupon where code = $1",
        [orderData]
      );
      const coupon = new Coupon({
        code: couponData.code,
        discount: couponData.discount,
        expireDate: new Date(couponData.expireDate),
      });
      order.addCupom(coupon);
    }
    order.freight = parseFloat(orderData.freight);
    return order;
  }

  async save(order: Order): Promise<Order> {
    return this.database.one(
      "insert into orders (id, clientCpf, date, serial) values (?, ?, ?, ?)",
      [
        order.code.value,
        order.client.cpf.value,
        order.date.toISOString(),
        order.serial,
      ]
    );
  }

  async count(): Promise<number> {
    const result = await this.database.one(
      "select count(*) as total from orders",
      []
    );
    return Number.parseInt(result.total);
  }

  async clean(): Promise<void> {
    await this.database.none("delete from orders", []);
  }
}
