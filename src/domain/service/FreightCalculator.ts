import { Product } from "../entity/Product"

export default class FreightCalculator {
    
    static calculate(product: Product, distance: number): number {
        let cost = distance * (product.volume / 1000) * product.density
        if( cost < 1000 ) {
            return 1000
        }
        return cost
    }
}