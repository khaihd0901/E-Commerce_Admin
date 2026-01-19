import { useEffect, useState } from "react";
import { getBrands } from "../../services/brandService/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableModal/Table";
import DetailModal from "../../components/TableModal/DetailModal";
import AddBrand from "./AddBrand";
export default function Brands() {
  const dispatch = useDispatch();

  const [showAdd, setShowAdd] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const addBrand = (brand) => {
    setShowAdd(false);
  };

  const deleteProduct = (id) => {};

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  console.log(brandState);
  const brands = [];
  for (let i = 0; i < brandState?.length; i++) {
    brands.push({
      key: i + 1,
      name: brandState[i].name,
    });
  }
  return (
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

      <Table data={brands} onDelete={deleteProduct} onView={setSelectedBrand} />

      {showAdd && (
        <AddBrand onClose={() => setShowAdd(false)} onAdd={addBrand} />
      )}

      {selectedBrand && (
        <DetailModal
          product={selectedBrand}
          onClose={() => setSelectedBrand(null)}
        />
      )}
    </div>
  );
}
