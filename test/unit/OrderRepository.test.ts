import { IClient } from "../../src/domain/entity/Client";
import Order from "../../src/domain/entity/Order";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

test("should be create order entry with 3 items and discount", async function () {
  const orderRepository = new OrderRepositoryMemory();
  const toCreate: IClient = {
    cpf: "186.360.540-10",
  };
  const date = new Date("2020-04-25");
  const order = new Order(toCreate, date, 1);
  await orderRepository.save(order);
  expect(order.code.value).toBe("202000000001");
});

test("should be able to create and restore order", async function () {
  const orderRepository = new OrderRepositoryMemory();
  const toCreate: IClient = {
    cpf: "186.360.540-10",
  };
  const date = new Date();
  const order = new Order(toCreate, date);
  await orderRepository.save(order);
  expect(order.code.value).toBeDefined();
  const returnedOrder = await orderRepository.getByCode(order.code.value);
  expect(returnedOrder?.code.value).toBeDefined();
  expect(returnedOrder?.code.value).toBe(order.code.value);
});
