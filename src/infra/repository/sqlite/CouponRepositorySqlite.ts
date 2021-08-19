import _ from "lodash";
import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import DatabaseSQL from "../../database/DatabaseSQL";
export default class CouponRepositorySqlite implements CouponRepository {
  items: { [key: string]: Coupon };
  constructor(database: DatabaseSQL) {
    this.items = {
      RAP10: new Coupon({
        code: "RAP10",
        discount: 10,
        expireDate: new Date("2021-10-10"),
      }),
    };
  }

  async getByCode(code: string): Promise<Coupon | undefined> {
    return this.items[code];
  }

  async save(coupon: Coupon): Promise<Coupon> {
    const id = _.uniqueId();
    return (this.items[id] = coupon);
  }
}
