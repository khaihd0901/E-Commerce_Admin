import { useEffect, useState } from "react";
import { getCoupons } from "../../services/couponService/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableModal/Table";
import DetailModal from "../../components/TableModal/DetailModal";
import AddCoupon from "./AddCoupon";

const Coupons = () => {
  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(false);
  const [selectCoupon, setSelectCoupon] = useState(null);
  const addCoupon = (cate) => {
    setShowAdd(false);
  };

  const deleteProduct = (id) => {};

  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const couponsState = useSelector((state) => state.coupon.coupons.data);
  const coupons = [];
  for (let i = 0; i < couponsState?.length; i++) {
    coupons.push({
      key: i + 1,
      name: couponsState[i].code,
      description: couponsState[i].des,
      type: couponsState[i].discountType,
      value: couponsState[i].discountValue,
      minPurchaseAmount:couponsState[i].minPurchaseAmount ,
      maxUses:couponsState[i].maxUses ,
      currentUses:couponsState[i].currentUses ,
      expiryDate:couponsState[i].expiryDate ,
      isActive:couponsState[i].isActive ,
      createdAt:couponsState[i].createdAt ,
      updatedAt:couponsState[i].updatedAt ,
    });
  }
  console.log(couponsState)
  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-xl shadow">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Coupon Management</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[var(--color-fdaa3d)] text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          + Add Category
        </button>
      </div>

      <Table
        data={coupons}
        onDelete={deleteProduct}
        onView={setSelectCoupon}
      />

      {showAdd && (
        <AddCoupon onClose={() => setShowAdd(false)} onAdd={addCoupon} />
      )}

      {selectCoupon && (
        <DetailModal
          data={selectCoupon}
          onClose={() => setSelectCoupon(null)}
        />
      )}
    </div>
  );
};

export default Coupons;
