
import { Client } from "./Client";
import Coupon from "./Coupon";
import Order from "./Order"
import OrderEntry from "./OrderEntry";
import { Product } from "./Product";

export default class PlaceOrder {
    coupons: Coupon[];
    orders: Order[];
    products: { [key: string]: Product; };

    constructor () {
        this.coupons = [
            new Coupon({code: "RAP10", discount: 10})
        ];

        this.products = {
            "1": new Product("barbeador", 100, { x: 5, y: 5, z: 10 }, 9000),
            "2": new Product("camera", 1_000, {x: 20, y: 15, z: 10}, 200),
            "3": new Product("guitar", 3_000, {x: 100, y: 30, z: 10}, 200),
            "4": new Product("geladeira", 40_000, {x: 200, y: 100, z: 50}, 200),
        }

        this.orders = [];
    }

    execute (input: any) {
        const client = new Client(input.client);

        const order = new Order(client);
        
        for (const item of input.items) {
            order.addEntry(new OrderEntry({product: this.products[item.product_id], quantity: item.quantity}));
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