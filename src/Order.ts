import { Client } from "./Client"
import Coupon from "./Coupon"
import OrderEntry from "./OrderEntry"
import { validateCPF } from "./validateCPF"

export default class Order {
    
    client: Client
    entries: OrderEntry[] = []
    coupons: Coupon[] = []

    constructor(client: IClient) {
        if( !validateCPF(client.cpf) ) {
            throw new Error("invalid cpf")
        }

        this.client = client
    }

    get subTotal (): number {
        return this.entries.reduce( (prev, entry) => entry.price + prev, 0 )
    }

    get discountTotal (): number {
        return this.subTotal - this.total
    }

    get total (): number {
        const applyCoupon = (value: number, coupon: Coupon) => {
            return coupon.apply(value)
        }

        return this.coupons
            .reduce(applyCoupon, this.subTotal)   
    }

    addEntry(entry: OrderEntry) {
        this.entries.push(entry)
    }

    addCupom(coupon: Coupon) {
        this.coupons.push(coupon)
    }

}