import Coupon from "../entity/Coupon";

export default interface CouponRepository {
    getById( id: string ): Promise<Coupon | undefined>
}