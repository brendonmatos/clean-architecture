
import { Client } from "./Client";
import Coupon from "./Coupon";
import Order from "./Order"
import OrderEntry from "./OrderEntry";
import ProductsRepository from "./ProductsRepository";

export default class PlaceOrder {
    coupons: Coupon[];
    orders: Order[];
    products: ProductsRepository

    constructor ({products}) {
        this.coupons = [
            new Coupon({code: "RAP10", discount: 10})
        ];

        this.products = products

        this.orders = [];
    }

    async execute (input: any) {
        const client = new Client(input.client);

        const order = new Order(client);
        
        for (const item of input.items) {
            const product = await this.products.getById(item.product_id);
            
            if (!product) {
                throw new Error("Invalid product id");
            }

            order.addEntry(new OrderEntry({product, quantity: item.quantity}));
        }

        if (input.coupons) {
            for (const inputCoupon of input.coupons) {
                const coupon = this.coupons.find(c => c.code === inputCoupon);
                if (coupon) order.addCupom(coupon);        
            }
        }
        
        this.orders.push(order);
        return {
            total: order.total
        };
    }
}