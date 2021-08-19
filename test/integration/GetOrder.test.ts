import GetOrder from "../../src/application/GetOrder";
import GetOrderInput from "../../src/application/GetOrderInput";
import PlaceOrder from "../../src/application/PlaceOrder";
import { PlaceOrderInput } from "../../src/application/PlaceOrderInput";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import GeoProviderMemory from "../../src/infra/gateway/memory/GeoProviderMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import DatabaseSqlite from "../../src/infra/database/DatabaseSqlite";
import ProductRepositorySqlite from "../../src/infra/repository/sqlite/ProductRepositorySqlite";
import { Product } from "../../src/domain/entity/Product";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

const databaseSqlite = new DatabaseSqlite("./database.sqlite");

beforeAll(async () => {
  await databaseSqlite.connect();

  await databaseSqlite.db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS clients;
    CREATE TABLE clients (cpf TEXT PRIMARY KEY);
    CREATE TABLE orders (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        clientCpf TEXT NOT NULL,
        FOREIGN KEY(clientCpf) REFERENCES clients(clientCpf)
    );
    CREATE TABLE products (
        id TEXT PRIMARY KEY, 
        name TEXT NOT NULL, 
        weight INT NOT NULL, 
        dimensionX INT NOT NULL, 
        dimensionY INT NOT NULL, 
        dimensionZ INT NOT NULL, 
        price INT NOT NULL
    );
    `);

  const productsRepository = new ProductRepositorySqlite(databaseSqlite);

  await productsRepository.save(
    new Product("1", "barbeador", 100, { x: 5, y: 5, z: 10 }, 9000)
  );
});

test("should be able to create an order and fetch it after", async function () {
  const placeOrderInput: PlaceOrderInput = {
    date: new Date("2020-01-20"),
    client: {
      cpf: "186.360.540-10",
    },
    cep: "999999",
    entries: [
      {
        productId: "1",
        quantity: 1,
      },
    ],
    coupons: ["RAP10"],
  };
  const geoMemory = new GeoProviderMemory();
  // const repositoryFactory = new DatabaseSQLRepositoryFactory();
  const repositoryFactory = new MemoryRepositoryFactory();
  const placeOrder = new PlaceOrder(repositoryFactory, geoMemory);
  await placeOrder.execute(placeOrderInput);
  const placeOrderOuput = await placeOrder.execute(placeOrderInput);
  expect(placeOrderOuput.code).toBe("202000000002");
});
