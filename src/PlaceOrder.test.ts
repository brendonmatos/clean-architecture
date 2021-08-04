import CouponsRepository from "./CouponsRepository"
import OrdersRepository from "./OrdersRepository"
import PlaceOrder from "./PlaceOrder"
import ProductsRepository from "./ProductsRepository"

test("should be create order entry with 3 items and discount", async function() {
    const placeOrder = new PlaceOrder({products: new ProductsRepository(), orders: new OrdersRepository(), coupons: new CouponsRepository()})

    const output = await placeOrder.execute({
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
    })

    expect(output.total).toBe(9000)
})
