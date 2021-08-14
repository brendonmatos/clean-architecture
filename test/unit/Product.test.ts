
/**
Preço do Frete = distância (km) * volume (m3) * (densidade/100)

Exemplos de volume ocupado (cubagem)

Camera: 20cm x 15 cm x 10 cm = 0,003 m3
Guitarra: 100cm x 30cm x 10cm = 0,03 m3
Geladeira: 200cm x 100cm x 50cm = 1 m3

Exemplos de densidade

Camera: 1kg / 0,003 m3 = 333kg/m3
Guitarra: 3kg / 0,03 m3 = 100kg/m3
Geladeira: 40kg / 1 m3 = 40kg/m3

*/

import { Product } from "../../src/domain/entity/Product"


test('product calculate camera density', () => {
    const product = new Product("1", "camera", 1_000, {x: 20, y: 15, z: 10}, 200)
    expect(product.volume).toBe(3000)
})

test('product calculate camera density', () => {
    const product = new Product("1", "camera", 1_000, {x: 20, y: 15, z: 10}, 200)
    expect(product.volume).toBe(3000)
    expect(product.density).toBeCloseTo(0.333, 3)
})

test('product calculate guitar density', () => {
    const product = new Product("1", "guitar", 3_000, {x: 100, y: 30, z: 10}, 200)
    expect(product.volume).toBe(30000)
    expect(product.density).toBeCloseTo(0.1, 3)
})

test('product calculate fridge density', () => {
    const product = new Product("1", "geladeira", 40_000, {x: 200, y: 100, z: 50}, 200)
    expect(product.volume).toBe(1000000)
    expect(product.density).toBeCloseTo(0.04, 3)
})