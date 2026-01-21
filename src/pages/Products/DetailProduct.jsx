import Modal from "../../components/TableModal/Modal";
import CustomerInput from "../../components/CustomerInput";
import {
  uploadProductImage,
  getProductById,
  clearProduct,
  updateProduct,
} from "../../services/productService/productSlice";
import { getCategories } from "../../services/categoryService/categorySlice";
import { getBrands } from "../../services/brandService/brandSlice";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import UploadImage from "./UploadImage";

const DetailProduct = ({ onClose, prodId }) => {
  const [images, setImages] = useState();
  const [deletedImages, setDeletedImages] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(clearProduct());
    dispatch(getProductById(prodId));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, prodId]);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.categories);

  const {
    product: proState,
    isLoading,
    isSuccess,
  } = useSelector((state) => state.product);
  console.log("isSuccess", isSuccess)
  const handleImageChange = useCallback((files, removedAssetIds) => {
    setImages(files);
    setDeletedImages(removedAssetIds);
  }, []);

  let validationSchema = Yup.object({
    productName: Yup.string().required("Email is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    price: Yup.string().required("Price is required"),
    tags: Yup.array().required("Tags are required"),
    des: Yup.string().required("Password is required"),
    stock: Yup.string().required("Stock is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: proState?.productName || "",
      category: proState?.category || "",
      brand: proState?.brand || "",
      price: proState?.price || "",
      tags: proState?.tags || [],
      des: proState?.des || "",
      stock: proState?.stock || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let uploadedImages = [];

      if (images?.length > 0) {
        uploadedImages = await dispatch(uploadProductImage(images)).unwrap();
      }
      dispatch(
        updateProduct({
          id: prodId,
          data: {
            ...values,
            newImages: uploadedImages,
            removedImages: deletedImages,
          },
        }),
      );
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onClose(true);
    }
  }, []);

  return (
    <Modal onClose={onClose} onSubmit={formik.handleSubmit}>
      {/* 🔥 RELATIVE WRAPPER */}
      <div className="relative">
        {/* 🔥 LOADING OVERLAY */}

        <h2 className="text-lg font-semibold mb-4">Product Detail</h2>

        <div className="p-4 bg-gray-100 min-w-5xl">
          <div className="grid grid-cols-12 gap-4">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="w-full h-56">
                <UploadImage
                  onChange={handleImageChange}
                  images={proState?.images}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="bg-gray-100 rounded-xl border border-gray-200 shadow-xl p-4">
                <h3 className="font-semibold mb-4">General Information</h3>

                {/* GENERAL INFORMATION */}

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
                        {categoryState?.map((c, index) => (
                          <option key={index} value={c._id}>
                            {c.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formik.touched.category && formik.errors.category ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.category}
                      </div>
                    ) : null}
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
                        {brandState?.map((b, index) => (
                          <option key={index} value={b._id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formik.touched.brand && formik.errors.brand ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.brand}
                      </div>
                    ) : null}
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
                    {formik.touched.price && formik.errors.price ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.price}
                      </div>
                    ) : null}
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
                    {formik.touched.tags && formik.errors.tags ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.tags}
                      </div>
                    ) : null}
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
                  {formik.touched.des && formik.errors.des ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.des}
                    </div>
                  ) : null}
                  <div className="grid grid-cols-2 gap-4">
                    {/* <CustomerInput
                                                                          onChange={formik.handleChange("ex")}
                    value={formik.values.ex}
                    type="date"
                    label="expiration date"
                    i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                  /> */}
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
                    {formik.touched.stock && formik.errors.stock ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.stock}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            type="button"
            disabled={isLoading}
            className="bg-red-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Save Change
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 z-50 flex items-center justify-center rounded-xl">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-600 font-medium">
              Loading product...
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailProduct;
