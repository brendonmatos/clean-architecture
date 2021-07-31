import PlaceOrder from "./PlaceOrder"

test("should be create order entry with 3 items and discount", async function() {
    const placeOrder = new PlaceOrder()

    const output = await placeOrder.execute({
        "client": {
            "cpf": "186.360.540-10",
        },
        "items": [
            {
                "product_id": "1",
                "quantity": 1
            },
        ],
        coupons : [
            "RAP10"
        ]
    })

    expect(output.total).toBe(8100)
})
