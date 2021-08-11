import _ from "lodash";
import Coupon from "../../../domain/entity/Coupon";
export default class CouponRepositoryMemory {
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