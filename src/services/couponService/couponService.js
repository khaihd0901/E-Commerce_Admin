import { base_url } from "../../utils/base_url";
import api from "../../utils/api";
const getCoupons = async () => {
  const res = await api.get(`${base_url}/coupon` );
  return res.data;
};
const getCouponById = async (id) => {
  const res = await api.get(`${base_url}/coupon/${id}` );
  return res.data;
};
const createCoupon = async (data) => {
  const res = await api.post(`${base_url}/coupon/create-coupon`,data );
  return res.data;
};
const updateCoupon = async (id,data) => {
  const res = await api.put(`${base_url}/coupon/update/${id}`,data );
  return res.data;
};
const deleteCoupon = async (id) => {
  const res = await api.delete(`${base_url}/coupon/${id}` );
  return res.data;
};

const couponService = {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
