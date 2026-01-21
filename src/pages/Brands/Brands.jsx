import { useEffect, useState } from "react";
import {
  deleteBrand,
  getBrands,
  resetBrandState,
} from "../../services/brandService/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableModal/Table";
import BrandDetail from "./BrandDetail";
import AddBrand from "./AddBrand";
import ConfirmModal from "../../components/ConfirmDialog";

const Brands = () => {
  const dispatch = useDispatch();
  const [brandId, setBrandId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const addBrand = () => {
    setShowAdd(false);
  };
  const handleDeleteClick = (e) => {
    setConfirmId(e.id); // open confirm modal
  };

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const brandsState = useSelector((state) => state.brand.brands.data);
  console.log(brandsState)
  const brands = [];
  for (let i = 0; i < brandsState?.length; i++) {
    brands.push({
      key: i + 1,
      id: brandsState[i]._id,
      name: brandsState[i].name,
    });
  }
  const handleView = (e) => {
    dispatch(resetBrandState());
    setBrandId(e.id);
  };
  const handleCloseAddBrand = (reload = true) => {
    setShowAdd(false);
    setBrandId(null);
    if (reload) {
      dispatch(getBrands());
    }
  };

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen rounded-xl shadow">
        <div className="flex justify-between mb-6">
          <h1 className="text-xl font-semibold">Brand Management</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-[var(--color-fdaa3d)] text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            + Add Brand
          </button>
        </div>

        <Table
          data={brands}
          onDelete={(e) => handleDeleteClick(e)}
          onView={(e) => handleView(e)}
        />

        {showAdd && <AddBrand onClose={handleCloseAddBrand} onAdd={addBrand} />}

        {brandId && (
          <BrandDetail brandId={brandId} onClose={handleCloseAddBrand} />
        )}
      </div>

      {confirmId && (
        <ConfirmModal
          open={true}
          title="Delete product?"
          message="This action cannot be undone."
          confirmText="Delete"
          onCancel={() => setConfirmId(null)}
          onConfirm={() => {
            dispatch(deleteBrand(confirmId))
              .unwrap()
              .then(() => {
                dispatch(getBrands()); // 🔥 reload table
                setConfirmId(null);
              });
          }}
        />
      )}
    </>
  );
};

export default Brands;
