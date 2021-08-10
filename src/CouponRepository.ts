import Coupon from "./Coupon";

export default interface CouponRepository {
    getById( id: string ): Coupon | undefined
}