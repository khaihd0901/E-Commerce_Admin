import { useEffect, useState } from "react";
import Table from "../../components/TableModal/Table";
import AddProduct from "./AddProduct";
import DetailProduct from "./DetailProduct";
import {
  deleteProductById,
  getProducts,
  resetProductState,
} from "../../services/productService/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../components/ConfirmDialog";
export default function Product() {
  const dispatch = useDispatch();
  const [prodId, setProdId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const addProduct = () => {
    setShowAdd(false);
  };

  const handleDeleteClick = (e) => {
    setConfirmId(e.id); // open confirm modal
  };

  const handleCloseAddProduct = (reload = true) => {
    console.log(reload)
    setShowAdd(false);
    if (reload) {
      dispatch(getProducts());
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const customerState = useSelector((state) => state.product.products);
  const products = [];
  for (let i = 0; i < customerState.length; i++) {
    products.push({
      key: i + 1,
      id: customerState[i]._id,
      name: customerState[i].productName,
      category: customerState[i].category?.categoryName,
      brand: customerState[i].brand?.name,
      stock: customerState[i].stock,
      price: customerState[i].price,
      ratingsQuantity: customerState[i].ratingsQuantity,
    });
  }
  const handleView = (e) => {
    dispatch(resetProductState()); // 🔥 IMPORTANT
    setProdId(e.id);
  };

  const handleCloseDetail = (shouldReload = false) => {
    setProdId(null);
    if (shouldReload) {
      dispatch(getProducts()); // 🔥 reload table data
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-xl shadow">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Product Management</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[var(--color-fdaa3d)] text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      <Table
        data={products}
        onDelete={e => handleDeleteClick(e)}
        onView={(e) => handleView(e)}
      />

      {showAdd && (
        <AddProduct onClose={handleCloseAddProduct} onAdd={addProduct} />
      )}

      {prodId && <DetailProduct prodId={prodId} onClose={handleCloseDetail} />}
      {confirmId && (
        <ConfirmModal
          open={true}
          title="Delete product?"
          message="This action cannot be undone."
          confirmText="Delete"
          onCancel={() => setConfirmId(null)}
          onConfirm={() => {
            dispatch(deleteProductById(confirmId))
              .unwrap()
              .then(() => {
                dispatch(getProducts()); // 🔥 reload table
                setConfirmId(null);
              });
          }}
        />
      )}
    </div>
  );
}
