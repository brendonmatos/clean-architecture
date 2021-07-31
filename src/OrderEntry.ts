

interface IOrderEntry { description: string; price: number; quantity: number}

export default class OrderEntry {
    description: string;
    price: number;
    quantity: number;

    constructor (entry: IOrderEntry) {
        this.description = entry.description;
        this.price = entry.price;
        this.quantity = entry.quantity;
    }

    getTotal () {
        return this.price * this.quantity;
    }
}