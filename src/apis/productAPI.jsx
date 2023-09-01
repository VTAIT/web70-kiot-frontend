import axiosInstance from "./axiosInstance";

const productAPI = {
    getAllProduct: (query) =>
        axiosInstance.get(
            `/product?cussor=${query.cussor}&search=${query.search}&price=${query.price}&category=${query.category}&fromdate=${query.fromdate}&todate=${query.todate}`
        ),
    createProduct: (values) => axiosInstance.post("/product/create", values),
    updateProduct: (values) => axiosInstance.post("/product/update", values),
    getByIdProduct: () => {},
};
export default productAPI;
