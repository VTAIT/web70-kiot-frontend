import axiosInstance from "./axiosInstance";

const saleOffAPI = {
  getAllSaleoff: (cussor, query) =>
    axiosInstance.get(`/saleoff?cussor=${cussor}&Did=${query.Did}`),
  getAllSaleoff_query: (cussor, query) =>
    axiosInstance.get(
      `/saleoff/query?cussor=${cussor}&search=${query.search}&rate=${query.rate}&active=${query.active}&fromdate=${query.fromdate}&todate=${query.todate}&Did=${query.Did}`
    ),
  createSaleoff: (values) => axiosInstance.post("/saleoff/create", values),
  updateSaleoff: (values) => axiosInstance.post("/saleoff/update", values),
  getByIdSaleoff: () => {},
};
export default saleOffAPI;
