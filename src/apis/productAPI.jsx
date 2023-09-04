import axiosInstance from "./axiosInstance";

const productAPI = {
    getAllProduct: (cussor) => axiosInstance.get(`/product?cussor=${cussor}`),
    getAllProduct_query: (cussor, query) =>
        axiosInstance.get(
            `/product/query?cussor=${cussor}&search=${query.search}&price=${query.price}&category=${query.category}&fromdate=${query.fromdate}&todate=${query.todate}`
        ),
    createProduct: (values) => axiosInstance.post("/product/create", values),
    updateProduct: (values) => axiosInstance.post("/product/update", values),
    getByIdProduct: () => {},
};
export default productAPI;
