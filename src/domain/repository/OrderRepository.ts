import Order from "../entity/Order";

export default interface OrderRepository {
    getById( id: string ): Promise<Order | undefined>
}