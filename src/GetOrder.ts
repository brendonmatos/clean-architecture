import GetOrderInput from "./GetOrderInput";
import GetOrderOutput from "./GetOrderOutput";
import OrderRepositoryMemory from "./OrderRepositoryMemory";

export default class GetOrder {
    orders: OrderRepositoryMemory
    constructor({orders}: {orders: OrderRepositoryMemory}) {
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