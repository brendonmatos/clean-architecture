import Order from "../domain/entity/Order";
import OrderEntry from "../domain/entity/OrderEntry";
import { GeoProvider } from "../domain/gateway/GeoProvider";
import FreightCalculator from "../domain/service/FreightCalculator";
import GeoProviderMemory from "../infra/gateway/memory/GeoProviderMemory";
import OrderRepositoryMemory from "../infra/repository/memory/OrderRepositoryMemory";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { PlaceOrderOutput } from "./PlaceOrderOutput";
import CouponRepository from "../domain/repository/CouponRepository";
import ProductRepository from "../domain/repository/ProductRepository";

export default class PlaceOrder {
    coupons: CouponRepository;
    orders: OrderRepositoryMemory;
    products: ProductRepository
    geo: GeoProviderMemory;

    constructor ({products, orders, coupons, geo}: {products: ProductRepository, orders: OrderRepositoryMemory, coupons: CouponRepository, geo: GeoProvider}) {
        this.coupons = coupons;
        this.products = products
        this.orders = orders
        this.geo = geo
    }

    async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const order = new Order(input.client);
        order.deliveryCEP = input.cep
        const deliverDistance = await this.geo.distanceBetweenZipCodes("800000", order.deliveryCEP);
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
                const coupon = await this.coupons.getByCode(inputCoupon);
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