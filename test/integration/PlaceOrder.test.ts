import GetOrder from "../../src/application/GetOrder"
import GetOrderInput from "../../src/application/GetOrderInput"
import PlaceOrder from "../../src/application/PlaceOrder"
import { PlaceOrderInput } from "../../src/application/PlaceOrderInput"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import GeoProviderMemory from "../../src/infra/gateway/memory/GeoProviderMemory"
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory"
import ProductRepositoryMemory from "../../src/infra/repository/memory/ProductRepositoryMemory"

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
    const orderRepository = new OrderRepositoryMemory()
    const productRepository = new ProductRepositoryMemory()
    const couponRepository = new CouponRepositoryMemory()
    const geoMemory = new GeoProviderMemory()
    const placeOrder = new PlaceOrder({products: productRepository, orders: orderRepository, coupons: couponRepository, geo: geoMemory})
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.total).toBe(9000)
})

test("should be able to create an order and fetch it after", async function() {
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
    const orderRepository = new OrderRepositoryMemory()
    const productRepository = new ProductRepositoryMemory()
    const couponRepository = new CouponRepositoryMemory()
    const geoMemory = new GeoProviderMemory()
    const placeOrder = new PlaceOrder({products: productRepository, orders: orderRepository, coupons: couponRepository, geo: geoMemory})
    const placeOrderOuput = await placeOrder.execute(placeOrderInput)
    const getOrder = new GetOrder({orders: orderRepository})
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


