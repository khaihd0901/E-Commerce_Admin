// import axios from 'axios'
import api from "../../utils/api";
import { base_url } from "../../utils/base_url";
import { toast } from "sonner";
const getProducts = async () => {
  const res = await api.get(`${base_url}/product`);
  return res.data;
};


const uploadProductImage = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });
  const res = await api.put(`${base_url}/product/upload`, formData);
  if (res) {
    return res.data;
  } else {
    toast.error("Image Upload False");
  }
};

const createProduct = async (data) => {
  const res = await api.post(`${base_url}/product/create-product`, data);
  if (res) {
    toast.success("Create Product Success");
    return res.data;
  } else {
    toast.error("Create Product False");
  }
};
const productService = {
  getProducts,
  createProduct,
  uploadProductImage,
};

export default productService;
