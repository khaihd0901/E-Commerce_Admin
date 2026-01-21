import { useEffect, useState } from "react";
import {
  deleteCoupon,
  getCoupons,
  resetCouponState,
} from "../../services/couponService/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableModal/Table";
import CouponDetail from "./CouponDetail";
import AddCoupon from "./AddCoupon";
import ConfirmModal from "../../components/ConfirmDialog";

const Coupons = () => {
  const dispatch = useDispatch();
  const [couId, setCouId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const addCoupon = () => {
    setShowAdd(false);
  };
  const handleDeleteClick = (e) => {
    setConfirmId(e.id); // open confirm modal
  };

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const couponsState = useSelector((state) => state.coupon.coupons.data);
  const coupons = [];
  for (let i = 0; i < couponsState?.length; i++) {
    coupons.push({
      key: i + 1,
      id: couponsState[i]._id,
      name: couponsState[i].code,
      description: couponsState[i].des,
      value: couponsState[i].discountValue,
      minPurchaseAmount: couponsState[i].minPurchaseAmount,
      maxUses: couponsState[i].maxUses,
      currentUses: couponsState[i].currentUses,
      expiryDate: couponsState[i].expiryDate,
      isActive: couponsState[i].isActive == true ? "Activated" : "Inactive",
      createdAt: couponsState[i].createdAt,
      updatedAt: couponsState[i].updatedAt,
    });
  }
  const handleView = (e) => {
    dispatch(resetCouponState()); // 🔥 IMPORTANT
    setCouId(e.id);
  };
  const handleCloseAddCoupon = (reload = true) => {
    setShowAdd(false)
    setCouId(null);
    if(reload){
      dispatch(getCoupons());
    }
  };

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen rounded-xl shadow">
        <div className="flex justify-between mb-6">
          <h1 className="text-xl font-semibold">Coupon Management</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-[var(--color-fdaa3d)] text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            + Add Coupon
          </button>
        </div>

        <Table
          data={coupons}
          onDelete={(e) => handleDeleteClick(e)}
          onView={(e) => handleView(e)}
        />

        {showAdd && (
          <AddCoupon onClose={handleCloseAddCoupon} onAdd={addCoupon} />
        )}

        {couId && <CouponDetail couId={couId} onClose={handleCloseAddCoupon} />}
      </div>

      {confirmId && (
        <ConfirmModal
          open={true}
          title="Delete product?"
          message="This action cannot be undone."
          confirmText="Delete"
          onCancel={() => setConfirmId(null)}
          onConfirm={() => {
            dispatch(deleteCoupon(confirmId))
              .unwrap()
              .then(() => {
                dispatch(getCoupons()); // 🔥 reload table
                setConfirmId(null);
              });
          }}
        />
      )}
    </>
  );
};

export default Coupons;
