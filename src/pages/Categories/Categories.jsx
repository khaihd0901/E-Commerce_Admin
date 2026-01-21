import { useEffect, useState } from "react";
import {
  deleteCategory,
  getCategories,
  resetCategoryState,
} from "../../services/categoryService/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableModal/Table";
import CategoryDetail from "./CategoryDetail";
import AddCategory from "./AddCategory";
import ConfirmModal from "../../components/ConfirmDialog";

const Categories = () => {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const addCategory = () => {
    setShowAdd(false);
  };
  const handleDeleteClick = (e) => {
    setConfirmId(e.id); // open confirm modal
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categoriesState = useSelector((state) => state.category.categories.data);
  console.log(categoriesState)
  const categories = [];
  for (let i = 0; i < categoriesState?.length; i++) {
    categories.push({
      key: i + 1,
      id: categoriesState[i]._id,
      name: categoriesState[i].categoryName,
    });
  }
  const handleView = (e) => {
    dispatch(resetCategoryState()); // 🔥 IMPORTANT
    setCategoryId(e.id);
  };
  const handleCloseAddBrand = (reload = true) => {
    setShowAdd(false);
    setCategoryId(null);
    if (reload) {
      dispatch(getCategories());
    }
  };

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen rounded-xl shadow">
        <div className="flex justify-between mb-6">
          <h1 className="text-xl font-semibold">Categories Management</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-[var(--color-fdaa3d)] text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            + Add Brand
          </button>
        </div>

        <Table
          data={categories}
          onDelete={(e) => handleDeleteClick(e)}
          onView={(e) => handleView(e)}
        />

        {showAdd && <AddBrand onClose={handleCloseAddBrand} onAdd={addCategory} />}

        {categoryId && (
          <CategoryDetail categoryId={categoryId} onClose={handleCloseAddBrand} />
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
            dispatch(deleteCategory(confirmId))
              .unwrap()
              .then(() => {
                dispatch(getCategories());
                setConfirmId(null);
              });
          }}
        />
      )}
    </>
  );
};

export default Categories;
