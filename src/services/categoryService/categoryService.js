import { base_url } from "../../utils/base_url";
import api from "../../utils/api";
const getCategories = async () => {
  const res = await api.get(`${base_url}/category` );
  return res.data;
};
const getCategoryById = async (id) => {
  const res = await api.get(`${base_url}/category/${id}` );
  return res.data;
};
const createCategory = async (data) => {
  const res = await api.post(`${base_url}/category/create-category`,data );
  return res.data;
};
const updateCategory = async (id,data) => {
  const res = await api.put(`${base_url}/category/update/${id}`,data );
  return res.data;
};
const deleteCategory = async (id) => {
  const res = await api.delete(`${base_url}/category/${id}` );
  return res.data;
};

const CategoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryService;
