import { IClient } from "../../src/domain/entity/Client";
import Order from "../../src/domain/entity/Order";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

test("should be create order entry with 3 items and discount", async function() {
    const orderRepository = new OrderRepositoryMemory();
    const toCreate: IClient = {
        cpf: "186.360.540-10"
    } 
    const date = new Date()
    const order = new Order(toCreate, date)
    await orderRepository.save(order)
    expect(order.id).toBeDefined()
    expect(order.id).toMatch(/[0-9]{4}[0-9]{8}/)
    const match = order.id?.match(/[0-9]{4}/)
    expect(match?.length).toBe(1)
    expect(match?.[0]).toBe(date.getFullYear().toString())
})

test("should be able to create and restore order", async function() {
    const orderRepository = new OrderRepositoryMemory();
    const toCreate: IClient = {
        cpf: "186.360.540-10"
    } 
    const date = new Date()
    const order = new Order(toCreate, date)
    await orderRepository.save(order)
    expect(order.id).toBeDefined()
    if(!order.id) throw new Error("order not found")
    const returnedOrder = await orderRepository.getById(order.id)
    expect(returnedOrder?.id).toBeDefined()
    expect(returnedOrder?.id).toBe(order.id)
})
