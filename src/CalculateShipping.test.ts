import CalculateShipping from "./CalculateShipping"



test(`should calculate shipping price`, async () => {
    const calculateShipping = new CalculateShipping()

    const output = await calculateShipping.execute({
        order: {
            entries: [
                { product_id: "1", quantity: 1 },
            ]
        }
    })
    
})