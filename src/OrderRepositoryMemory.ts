import Order from "./Order";
import OrderRepository from "./OrderRepository";
import _ from "lodash";


const FORMAT_INDEX_SIZE = 8

const formatUnique = (year, index: number) => {
    return `${year}${index.toString().padStart(FORMAT_INDEX_SIZE, '0')}`
}

export default class OrderRepositoryMemory implements OrderRepository {
    items: Order[] = []
    
    async getById(id: string): Promise<Order | undefined>{
        for (const order of this.items) {
            if (order.id === id) {
                return order;
            }
        }
        return undefined
    }

    async save(order: Order): Promise<Order>{
        const newSize = this.items.push(order)

        if( !order.date ) {
            debugger
            throw new Error("Order date is not defined")
        }

        order.id = formatUnique(order.date.getFullYear().toString(), newSize);
        return order;
    }
}
