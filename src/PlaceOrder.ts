
import { Client } from "./Client";
import Coupon from "./Coupon";
import Order from "./Order"
import OrderEntry from "./OrderEntry";

export default class PlaceOrder {
    coupons: Coupon[];
    orders: Order[];

    constructor () {
        this.coupons = [
            new Coupon({code: "RAP10", discount: 10})
        ];
        this.orders = [];
    }

    execute (input: any) {
        const client = new Client(input.client);

        const order = new Order(client);
        
        for (const item of input.items) {
            order.addEntry(new OrderEntry(item));
        }

        if (input.coupons) {
            for (const inputCoupon of input.coupons) {
                const coupon = this.coupons.find(c => c.code === inputCoupon);
                if (coupon) order.addCupom(coupon);        
            }
        }
        
        const total = order.total;
        this.orders.push(order);
        return {
            total
        };
    }
}