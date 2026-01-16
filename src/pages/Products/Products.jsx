import { useState } from "react";
import ProductTable from "./ProductTable";
import AddProductModal from "./AddProductModal";
import ProductDetailModal from "./ProductDetailModal";

export default function Product() {
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 15", price: 1200, description: "Apple phone" },
    { id: 2, name: "MacBook Pro", price: 2200, description: "Apple laptop" },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
    setShowAdd(false);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
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

      <ProductTable
        products={products}
        onDelete={deleteProduct}
        onView={setSelectedProduct}
      />

      {showAdd && (
        <AddProductModal
          onClose={() => setShowAdd(false)}
          onAdd={addProduct}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
