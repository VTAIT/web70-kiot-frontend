import axiosInstance from "./axiosInstance";

const productAPI = {
    getAllProduct: () => axiosInstance.get("/product"),
    createProduct: (values) => axiosInstance.post("/product/create", values),
    updateProduct: (values) => axiosInstance.post("/product/update", values),
    getByIdProduct: () => {},
};
export default productAPI;
