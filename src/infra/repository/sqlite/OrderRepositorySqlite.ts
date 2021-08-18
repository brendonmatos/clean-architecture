import _ from "lodash";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DatabaseSQL from "../../database/DatabaseSQL";

const FORMAT_INDEX_SIZE = 8;

const formatUnique = (year, index: number) => {
  return `${year}${index.toString().padStart(FORMAT_INDEX_SIZE, "0")}`;
};

export default class OrderRepositorySqlite implements OrderRepository {
  database: DatabaseSQL;

  constructor(database: DatabaseSQL) {
    this.database = database;
  }

  async getByCode(id: string): Promise<Order | undefined> {
    return this.database.one("select * from orders where id = ?", [id]);
  }

  async save(order: Order): Promise<Order> {
    order.id = formatUnique(order.date.getFullYear().toString(), _.uniqueId());
    return this.database.one(
      "insert into orders (id, clientCpf, date) values (?, ?, ?)",
      [order.id, order.client.cpf, order.date]
    );
  }
}
