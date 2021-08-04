import Order from "./Order";
import _ from "lodash";
export default class OrdersRepository {
    items: { [key: string]: Order };
    constructor(){
        this.items = {
        }
    }

    async getById(id): Promise<Order>{
        return this.items[id];
    }

    async save(order: Order): Promise<Order>{
        const id = _.uniqueId();
        return this.items[id] = order;
    }
}