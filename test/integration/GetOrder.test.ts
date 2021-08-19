import GetOrder from "../../src/application/GetOrder";
import GetOrderInput from "../../src/application/GetOrderInput";
import PlaceOrder from "../../src/application/PlaceOrder";
import { PlaceOrderInput } from "../../src/application/PlaceOrderInput";
import GeoProviderMemory from "../../src/infra/gateway/memory/GeoProviderMemory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";
import DatabaseSQLRepositoryFactory from "../../src/infra/factory/DatabaseSQLRepositoryFactory";
import DatabaseSqlite from "../../src/infra/database/DatabaseSqlite";

beforeAll(async () => {
  const repositoryFactory = new DatabaseSQLRepositoryFactory();

  await DatabaseSqlite.getInstance().connect();
  await repositoryFactory.createOrderRepository().clean();
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
  const repositoryFactory = new DatabaseSQLRepositoryFactory();
  // const repositoryFactory = new MemoryRepositoryFactory();
  const placeOrder = new PlaceOrder(repositoryFactory, geoMemory);
  await placeOrder.execute(placeOrderInput);
  const placeOrderOuput = await placeOrder.execute(placeOrderInput);
  expect(placeOrderOuput.code).toBe("202000000002");
});
