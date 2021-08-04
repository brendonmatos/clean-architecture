
import FreightCalculator from "./FreightCalculator"
import { Product } from "./Product"

test(`should calculate shipping price`, async () => {
    const product = new Product("camera", 1_000, {x: 20, y: 15, z: 10}, 200)
    expect(FreightCalculator.calculate(product, 1000)).toEqual(1000)
})

test(`should calculate shipping price`, async () => {
    const product = new Product("guitar", 3_000, {x: 100, y: 30, z: 10}, 200)
    expect(FreightCalculator.calculate(product, 1000)).toEqual(3000)
})

test(`should calculate shipping price min`, async () => {
    const product = new Product("barbeador", 100, { x: 5, y: 5, z: 10 }, 9000)
    expect(FreightCalculator.calculate(product, 1000)).toEqual(1000)
})