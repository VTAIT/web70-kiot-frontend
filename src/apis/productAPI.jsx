import axiosInstance from "./axiosInstance";

const productAPI = {
    getAllProduct: (cussor) => axiosInstance.get(`/product?cussor=${cussor}`),
    createProduct: (values) => axiosInstance.post("/product/create", values),
    updateProduct: (values) => axiosInstance.post("/product/update", values),
    getByIdProduct: () => {},
};
export default productAPI;
