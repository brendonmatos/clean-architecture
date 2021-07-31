import Coupon from './Coupon'
import Order from './Order'
import OrderEntry from './OrderEntry'

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
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 20_00}))
})

test("should be able to add items to order", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 20_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 20_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 20_00}))
})

test("should sum all items from order", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 20_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 10_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 15_00}))
    expect(order.total).toBe(45_00) 
})

test("should be able to add coupon to the order", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 20_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 10_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 15_00}))

    order.addCupom({code: "RAP10", discount: 30})
})


test("should discount based on coupon", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 20_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 10_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 15_00}))
    order.addCupom(new Coupon({code: "RAP10", discount: 30}))
    expect(order.total).toBe(31_50) 
})


test("should all the totals match with real math", function() {
    const order = new Order({cpf: "783.511.060-11"})
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 20_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 10_00}))
    order.addEntry(new OrderEntry({description: "creme de barbear", quantity: 2, price: 15_00}))
    order.addCupom(new Coupon({code: "RAP10", discount: 30}))
    expect(order.total).toBe(31_50) 
    expect(order.discountTotal).toBe(13_50) 
    expect(order.subTotal).toBe(45_00) 
})

