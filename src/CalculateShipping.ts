import GeoProvider from "./GeoProvider";
import { IOrderEntry } from "./OrderEntry";
import ProductsRepository from "./ProductsRepository";


export interface Order {
    entries: IOrderEntry[];
}

export interface CalculateShippingDTO {
    cep: string;
    order: IOrder;
}

export interface CalculateShippingResult {
    shipping: { cost: number }
}

export default class CalculateShipping {
    
    products: ProductsRepository;
    geo: GeoProvider;

    constructor({products, geo}) { 
        this.products = products;
        this.geo = geo
    } 

    async execute(input: CalculateShippingDTO): Promise<CalculateShippingResult> {
        const { cep } = input;
        const deliverDistance = await this.geo.distanceBetweenZipCodes("800000", cep);
        let totalVolume = 0;
        let totalDensity = 0;
        for (const entry of input.order.entries) {
            const product = await this.products.getById(entry.product_id);
            if (!product) {
                throw new Error("Invalid product id");
            }
            totalDensity += product.density;
            totalVolume += product.volume;
        }
        let cost = deliverDistance * (totalVolume / 1000) * totalDensity
        if( cost < 1000 ) {
            cost = 1000
        }
        return {
            shipping: {
                cost
            }
        }
    }
}