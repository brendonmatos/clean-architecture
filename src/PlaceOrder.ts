import CouponsRepository from "./CouponsRepository";
import FreightCalculator from "./FreightCalculator";
import GeoProviderMemory from "./GeoProviderMemory";
import Order from "./Order"
import OrderEntry from "./OrderEntry";
import OrdersRepository from "./OrdersRepository";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { PlaceOrderOutput } from "./PlaceOrderOutput";
import ProductsRepository from "./ProductsRepository";


export default class PlaceOrder {
    coupons: CouponsRepository;
    orders: OrdersRepository;
    products: ProductsRepository
    geo: GeoProviderMemory;

    constructor ({products, orders, coupons}) {
        this.coupons = coupons;
        this.products = products
        this.orders = orders
        this.geo = new GeoProviderMemory()
    }

    async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const order = new Order(input.client);
        order.deliveryCEP = input.cep
        const deliverDistance = this.geo.distanceBetweenZipCodes("800000", order.deliveryCEP);
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
                const coupon = await this.coupons.getById(inputCoupon);
                if (coupon) order.addCupom(coupon);        
            }
        }
        await this.orders.save(order);
        if( !order.id ) {
            throw new Error("Order not saved");
        }
        return {
            id: order.id,
            total: order.total
        };
    }
}