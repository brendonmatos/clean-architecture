import { Product } from "./Product";


export interface IOrderEntry { product: Product; quantity: number}

export default class OrderEntry {
    product: Product;
    quantity: number;

    constructor (entry: IOrderEntry) {
        this.product = entry.product;
        this.quantity = entry.quantity;
    }

    getTotal () {
        return this.product.price * this.quantity;
    }
}