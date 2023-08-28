import axiosInstance from "./axiosInstance";

const productAPI = {
    getAllProduct: () => axiosInstance.get("/product"),
    getByIdProduct: () => {},
    updateProduct: () => {},
    deleteProdcuct: () => {},
    createProduct: () => {},
};
export default productAPI;
