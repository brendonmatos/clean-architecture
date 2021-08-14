import { Product } from "../../src/domain/entity/Product"
import FreightCalculator from "../../src/domain/service/FreightCalculator"

test(`should calculate shipping price`, async () => {
    const product = new Product("1", "camera", 1_000, {x: 20, y: 15, z: 10}, 200)
    expect(FreightCalculator.calculate(product, 1000)).toEqual(1000)
})

test(`should calculate shipping price`, async () => {
    const product = new Product("2", "guitar", 3_000, {x: 100, y: 30, z: 10}, 200)
    expect(FreightCalculator.calculate(product, 1000)).toEqual(3000)
})

test(`should calculate shipping price min`, async () => {
    const product = new Product("3", "barbeador", 100, { x: 5, y: 5, z: 10 }, 9000)
    expect(FreightCalculator.calculate(product, 1000)).toEqual(1000)
})