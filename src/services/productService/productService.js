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
  if (res.data) {
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

const getProductById = async(id) =>{
  const res = await api.get(`${base_url}/product/${id}`)
  return res.data
}

const updateProduct = async(id,data) =>{
  const res = await api.put(`${base_url}/product/update/${id}`,data)
    if (res) {
    toast.success("Update Product Success");
    return res.data;
  } else {
    toast.error("Update Product False");
  }
}

const deleteProductById = async(id) =>{
  const res = await api.delete(`${base_url}/product/${id}`)
  if(res){
    toast.success("Delete Product Success")
  }else{
    toast.error('Something when wrong')
  }
}

const productService = {
  getProducts,
  createProduct,
  uploadProductImage,
  updateProduct,
  getProductById,
  deleteProductById,
};

export default productService;
