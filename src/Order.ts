import { Client, IClient } from "./Client"
import Coupon from "./Coupon"
import OrderEntry from "./OrderEntry"

export default class Order {
        
    client: Client
    entries: OrderEntry[] = []
    coupons: Coupon[] = []
    freight: number = 0
    id: string | undefined
    date: Date

    constructor(client: IClient, date: Date = new Date()) {
        this.client = new Client(client)
        this.date = date
    }

    get subTotal (): number {
        let subTotal = this.entries.reduce( (prev, entry) => entry.getTotal() + prev, 0 )
        subTotal += this.freight
        return subTotal
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