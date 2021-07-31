import CalculateShipping from "./CalculateShipping"
import GeoProvider from "./GeoProvider"
import ProductsRepository from "./ProductsRepository"



test(`should calculate shipping price`, async () => {
    const calculateShipping = new CalculateShipping({products: new ProductsRepository(), geo: new GeoProvider()})

    const output = await calculateShipping.execute({
        cep: "01001-001",
        order: {
            entries: [
                { product_id: "2", quantity: 1 },
            ]
        }
    })

    expect(output.shipping.cost).toEqual(1000)
    
})

test(`should calculate shipping price`, async () => {
    const calculateShipping = new CalculateShipping({products: new ProductsRepository(), geo: new GeoProvider()})

    const output = await calculateShipping.execute({
        cep: "01001-001",
        order: {
            entries: [
                { product_id: "3", quantity: 1 },
            ]
        }
    })

    expect(output.shipping.cost).toEqual(3000)
    
})

test(`should calculate shipping price min`, async () => {
    const calculateShipping = new CalculateShipping({products: new ProductsRepository(), geo: new GeoProvider()})

    const output = await calculateShipping.execute({
        cep: "01001-001",
        order: {
            entries: [
                { product_id: "1", quantity: 1 },
            ]
        }
    })

    expect(output.shipping.cost).toEqual(1000)
    
})