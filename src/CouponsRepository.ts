import Coupon from "./Coupon";
import _ from "lodash";
export default class CouponsRepository {
    items: { [key: string]: Coupon };
    constructor(){
        this.items = {
            "RAP10": new Coupon({code: "RAP10", discount: 10, expireDate: new Date("2021-10-10")})
        }
    }

    async getById(code: string): Promise<Coupon>{
        return this.items[code];
    }

    async save(coupon: Coupon): Promise<Coupon>{
        const id = _.uniqueId();
        return this.items[id] = coupon;
    }
}