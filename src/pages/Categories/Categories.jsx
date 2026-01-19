import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableModal/Table";
import DetailModal from "../../components/TableModal/DetailModal";
import AddCategory from "./AddCategory";

const Categories = () => {
  const dispatch = useDispatch();

  const [showAdd, setShowAdd] = useState(false);
  const [selectedCate, setSelectedCate] = useState(null);

  const addCategory = (cate) => {
    setShowAdd(false);
  };

  const deleteProduct = (id) => {};

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoriesState = useSelector((state) => state.category.categories);
  const categories = [];
  for (let i = 0; i < categoriesState?.length; i++) {
    categories.push({
      key: i + 1,
      name: categoriesState[i].categoryName,
    });
  }
  console.log(categories);
  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-xl shadow">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Category Management</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[var(--color-fdaa3d)] text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          + Add Category
        </button>
      </div>

      <Table
        data={categories}
        onDelete={deleteProduct}
        onView={setSelectedCate}
      />

      {showAdd && (
        <AddCategory onClose={() => setShowAdd(false)} onAdd={addCategory} />
      )}

      {selectedCate && (
        <DetailModal
          data={selectedCate}
          onClose={() => setSelectedCate(null)}
        />
      )}
    </div>
  );
};

export default Categories;
