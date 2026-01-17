import { useEffect, useState } from "react";
import Table from "../../components/TableModal/Table";
import AddProduct from "./AddProduct";
import DetailModal from "../../components/TableModal/DetailModal";
import {getProducts} from '../../services/productService/productSlice'
import {useDispatch, useSelector} from 'react-redux'
export default function Product() {
  const dispatch = useDispatch();

  const [showAdd, setShowAdd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProduct = (product) => {
    setShowAdd(false);
  };

  const deleteProduct = (id) => {

  };

  useEffect(()=>{
    dispatch(getProducts())
  },[])

  const customerState = useSelector((state) => state.product.products)
  const products = []
  for(let i=0; i < customerState.length; i++){
      products.push({
        key: i+1,
        name: customerState[i].productName,
        category: customerState[i].category,
        stock: customerState[i].stock,
        price: customerState[i].price,
        ratingsQuantity: customerState[i].ratingsQuantity
      })
  }
  
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
        onDelete={deleteProduct}
        onView={setSelectedProduct}
      />

      {showAdd && (
        <AddProduct
          onClose={() => setShowAdd(false)}
          onAdd={addProduct}
        />
      )}

      {selectedProduct && (
        <DetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
