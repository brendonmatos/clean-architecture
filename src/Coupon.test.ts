import Coupon from "./Coupon"

test("Should refuse expired coupons", function() {
    const coupon = new Coupon({code: "12093123", discount: 10, expireDate: new Date('2020-02-01') })
    expect(coupon.isExpired()).toBe(true)
})

test("Should accept valida coupons", function() {
    const coupon = new Coupon({code: "12093123", discount: 10, expireDate: new Date('2021-11-10') })
    expect(coupon.isExpired()).toBe(false)
})