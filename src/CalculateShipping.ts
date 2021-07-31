import GeoProvider from "./GeoProvider";
import ProductsRepository from "./ProductsRepository";

export default class CalculateShipping {
    
    products: ProductsRepository;
    geo: GeoProvider;

    constructor({products, geo}) { 
        this.products = products;
        this.geo = geo
    } 

    async execute(input) {
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
        console.log(deliverDistance, totalVolume, totalDensity);
        return {
            shipping: {
                cost: deliverDistance * (totalVolume / 1000) * totalDensity,
            }
        }
    }
}