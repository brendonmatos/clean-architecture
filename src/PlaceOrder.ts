
import { Client, IClient } from "./Client";
import Coupon from "./Coupon";
import FreightCalculator from "./FreightCalculator";
import GeoProviderMemory from "./GeoProviderMemory";
import Order from "./Order"
import OrderEntry from "./OrderEntry";
import OrdersRepository from "./OrdersRepository";
import ProductsRepository from "./ProductsRepository";

export interface IOrderEntry {
    productId: string;
    quantity: number;
}

export interface PlaceOrderDTO {
    cep: string;
    client: IClient;
    entries: IOrderEntry[];
    coupons: string[];
}

export default class PlaceOrder {
    coupons: Coupon[];
    orders: OrdersRepository;
    products: ProductsRepository
    geo: GeoProviderMemory;

    constructor ({products, orders}) {
        this.coupons = [
            new Coupon({code: "RAP10", discount: 10, expireDate: new Date("2021-10-10")})
        ];
        this.products = products
        this.orders = orders
        this.geo = new GeoProviderMemory()
    }

    async execute (input: PlaceOrderDTO): Promise<{total: number}> {
        const order = new Order(input.client);

        const deliverDistance = this.geo.distanceBetweenZipCodes("800000", input.cep);

        for (const item of input.entries) {
            const product = await this.products.getById(item.productId);
            
            if (!product) {
                throw new Error("Product not found");
            }

            order.addEntry(new OrderEntry({product, quantity: item.quantity}));
            order.freight += FreightCalculator.calculate(product, deliverDistance);
        }

        if (input.coupons) {
            for (const inputCoupon of input.coupons) {
                const coupon = this.coupons.find(c => c.code === inputCoupon);
                if (coupon) order.addCupom(coupon);        
            }
        }
        
        this.orders.save(order);
        return {
            total: order.total
        };
    }
}