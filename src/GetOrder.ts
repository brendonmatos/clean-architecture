import GetOrderInput from "./GetOrderInput";
import GetOrderOutput from "./GetOrderOutput";
import OrdersRepository from "./OrdersRepository";

export default class GetOrder {
    orders: OrdersRepository
    constructor({orders}: {orders: OrdersRepository}) {
        this.orders = orders;
    }

    public async execute(input: GetOrderInput): Promise<GetOrderOutput> {
        const order = await this.orders.getById(input.id);
        if(!order || !order.id){
            throw new Error("Order not found");
        }
        return {
            id: order.id,
            clientCPF: order.client.cpf.value,
            discount: order.discountTotal,
            items: order.entries.map(entry => ({price: entry.getTotal(), quantity: entry.quantity})),
            freightTotal: order.freight,
            total: order.total,
            deliveryCEP: order.deliveryCEP,
        }
    }
}