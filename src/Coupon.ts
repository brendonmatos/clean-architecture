 
interface ICoupon { code: string; discount: number }

export default class Coupon {
    code: string;
    discount: number;

    constructor (coupon: ICoupon) {
        this.code = coupon.code;
        this.discount = coupon.discount;
    }

    apply (price: number): number {
        const discount = (price * this.discount) / 100;
        return price - discount;
    }
}