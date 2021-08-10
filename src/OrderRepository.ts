import Order from "./Order";

export default interface OrderRepository {
    getById( id: string ): Promise<Order | undefined>
}