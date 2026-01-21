import Modal from "../../components/TableModal/Modal";
import CustomerInput from "../../components/CustomerInput";
import {
  createProduct,
  uploadProductImage,
} from "../../services/productService/productSlice";
import { getCategories } from "../../services/categoryService/categorySlice";
import { getBrands } from "../../services/brandService/brandSlice";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import UploadImage from "./UploadImage";

export default function AddProductModal({ onClose }) {
  const [images, setImages] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const CateState = useSelector((state) => state.category.categories);
  const { isLoading, isSuccess } = useSelector((state) => state.product);

  let validationSchema = Yup.object({
    productName: Yup.string().required("Email is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    price: Yup.string().required("Price is required"),
    tags: Yup.string().required("Tags are required"),
    des: Yup.string().required("Password is required"),
    stock: Yup.string().required("Stock is required"),
  });

  const formik = useFormik({
    initialValues: {
      images: images,
      productName: "",
      category: "",
      brand: "",
      price: "",
      tags: "",
      des: "",
      stock: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const uploaded = await dispatch(uploadProductImage(images)).unwrap();
        const payload = {
          ...values,
          images: uploaded,
        };
        dispatch(createProduct(payload));
      } catch (error) {
        console.log(error);
      }
    },
  });
  useCallback(() => {
    if (isSuccess) {
      onClose(true);
    }
  }, [isSuccess,onClose]);
  
  const handleImagesChange = (files) => {
    if (!files || files.length === 0) return;
    setImages(files);
  };

  return (
    <Modal onClose={onClose} onSubmit={formik.handleSubmit}>
      {/* 🔥 RELATIVE WRAPPER */}
      <div className="relative">
        {/* 🔥 LOADING OVERLAY */}
        {/* FORM */}
        <div className="p-4 bg-gray-100 min-w-5xl">
          <div className="grid grid-cols-12 gap-4">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="w-full h-56">
                <UploadImage onChange={handleImagesChange} />
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="bg-gray-100 rounded-xl border border-gray-200 shadow-xl p-4">
                <h3 className="font-semibold mb-4">General Information</h3>

                <div className="space-y-4">
                  <CustomerInput
                    onChange={formik.handleChange("productName")}
                    value={formik.values.productName}
                    type="text"
                    label="product name"
                    i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                    placeholder="Product Name"
                  />
                  {formik.touched.productName && formik.errors.productName ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productName}
                    </div>
                  ) : null}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-medium">Product type</span>
                      <select
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
    rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
    focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                      >
                        <option value="">Select category</option>
                        {CateState.map((c, index) => (
                          <option key={index} value={c._id}>
                            {c.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="font-medium">Product brand</span>
                      <select
                        name="brand"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
    rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
    focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                      >
                        <option value="">Select brand</option>
                        {brandState.map((b, index) => (
                          <option key={index} value={b._id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <CustomerInput
                      onChange={formik.handleChange("price")}
                      value={formik.values.price}
                      type="text"
                      label="price"
                      defaultValue="$100.00"
                      i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <CustomerInput
                      onChange={formik.handleChange("tags")}
                      value={formik.values.tags}
                      type="text"
                      label="product tag"
                      placeholder="Type and enter"
                      i_class="w-full mb-3 pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                    />
                  </div>

                  <textarea
                    onChange={formik.handleChange("des")}
                    value={formik.values.des}
                    maxLength={200}
                    className="border rounded-xl px-3 py-2 w-full min-h-50 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                    placeholder="Description"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <CustomerInput
                      onChange={formik.handleChange("stock")}
                      value={formik.values.stock}
                      defaultValue={1}
                      min={1}
                      max={1000}
                      type="number"
                      label="stock"
                      i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            type="button"
            disabled={isLoading}
            className="border px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Add
          </button>
        </div>

      </div>
      
                {isLoading && (
          <div className="absolute inset-0 z-50 bg-white/70 flex items-center justify-center rounded-xl">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-sm text-gray-600 font-medium">
                Creating product...
              </p>
            </div>
          </div>
        )}
    </Modal>
  );
}
