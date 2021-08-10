import CouponsRepository from "./CouponsRepository"
import GetOrder from "./GetOrder"
import GetOrderInput from "./GetOrderInput"
import OrdersRepository from "./OrdersRepository"
import PlaceOrder from "./PlaceOrder"
import { PlaceOrderInput } from "./PlaceOrderInput"
import ProductsRepository from "./ProductsRepository"

test("should be create order entry with 3 items and discount", async function() {
    const placeOrderInput: PlaceOrderInput = {
        "client": {
            "cpf": "186.360.540-10",
        },
        "cep": "999999",
        "entries": [
            {
                "productId": "1",
                "quantity": 1
            },
        ],
        coupons : [
            "RAP10"
        ]
    }
    const placeOrder = new PlaceOrder({products: new ProductsRepository(), orders: new OrdersRepository(), coupons: new CouponsRepository()})
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.total).toBe(9000)
})

test("should be able to create an order and fetch it after", async function() {
    const ordersRepository = new OrdersRepository()
    const placeOrderInput: PlaceOrderInput = {
        "client": {
            "cpf": "186.360.540-10",
        },
        "cep": "999999",
        "entries": [
            {
                "productId": "1",
                "quantity": 1
            },
        ],
        coupons : [
            "RAP10"
        ]
    }
    const placeOrder = new PlaceOrder({products: new ProductsRepository(), orders: ordersRepository, coupons: new CouponsRepository()})
    const placeOrderOuput = await placeOrder.execute(placeOrderInput)
    const getOrder = new GetOrder({orders: ordersRepository})
    const getOrderInput: GetOrderInput = {
        id: placeOrderOuput.id
    } 
    const getOrderOutput = await getOrder.execute(getOrderInput)
    expect(getOrderOutput.id).toBe(placeOrderOuput.id)
    expect(getOrderOutput.clientCPF).toBeDefined()
    expect(getOrderOutput.deliveryCEP).toBeDefined()
    expect(getOrderOutput.discount).toBeDefined()
    expect(getOrderOutput.freightTotal).toBeDefined()
    expect(getOrderOutput.total).toBeDefined()
    expect(getOrderOutput.items).toBeDefined()
    expect(getOrderOutput.items.length).toBe(1)
})


