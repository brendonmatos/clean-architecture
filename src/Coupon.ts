 
interface ICoupon { code: string; discount: number, expireDate: Date }

export default class Coupon {
    code: string;
    discount: number;
    expireDate: Date;

    constructor (coupon: ICoupon) {
        this.code = coupon.code;
        this.discount = coupon.discount;
        this.expireDate = coupon.expireDate;
    }

    apply (price: number): number {
        const discount = (price * this.discount) / 100;
        return price - discount;
    }


    isExpired(): boolean {
        console.log(Date.now(), this.expireDate.getTime())

        return Date.now() > this.expireDate.getTime();
    }
}