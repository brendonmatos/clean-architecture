import Coupon from './Coupon'
import Order from './Order'
import OrderEntry from './OrderEntry'
import { Product } from './Product'

test("Should not be able to create order with invalid cpf", function() {
    const createOrder = () => {
        new Order({cpf: "783.511.069-81"})
    }

    expect(createOrder).toThrowError()
})

test("Should be able to create order", function() {
    const order = new Order({cpf: "783.511.060-11"})
    expect(order).toBeDefined()
})

test("should be able to add item to order", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 20_00), quantity:2}))
})

test("should be able to add items to order", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 20_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 20_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 20_00), quantity:2}))
})

test("should sum all items from order", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 20_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 10_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 15_00), quantity:2}))
    expect(order.total).toBe(90_00) 
})

test("should be able to add coupon to the order", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 20_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 10_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 15_00), quantity:2}))
    order.addCupom(new Coupon({code: "RAP10", discount: 30, expireDate: new Date("2021-10-10")}))
})


test("should discount based on coupon", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 20_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 10_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 15_00), quantity:2}))
    order.addCupom(new Coupon({code: "RAP10", discount: 30, expireDate: new Date("2021-10-10")}))
    expect(order.total).toBe(63_00) 
})


test("should all the totals match with real math", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 20_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 10_00), quantity:2}))
    order.addEntry(new OrderEntry({product: new Product("creme de barbear", 0, {x: 1, y:1, z:1}, 15_00), quantity:2}))
    order.addCupom(new Coupon({code: "RAP10", discount: 30, expireDate: new Date("2021-10-10")}))
    expect(order.total).toBe(6300) 
    expect(order.discountTotal).toBe(2700) 
    expect(order.subTotal).toBe(9000) 
})

