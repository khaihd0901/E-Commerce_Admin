import { base_url } from "../../utils/base_url";
import api from "../../utils/api";
const getCoupons = async () => {
  const res = await api.get(`${base_url}/coupon` );
  return res.data;
};

const couponService = {
  getCoupons,
};

export default couponService;
