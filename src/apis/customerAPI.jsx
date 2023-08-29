import axiosInstance from "./axiosInstance";

const customerAPI = {
  getAll: () => axiosInstance.get("/customer"),
  getById: () => axiosInstance.get("/customer/getById"),
  getByUserName: () => axiosInstance.get("/customer/getById"),
  getAllByKiot: () => axiosInstance.get("/customer"),
  create: (values) => axiosInstance.post("/customer/create", values),
  update: (values) => axiosInstance.post("/customer/update", values),
};

export default customerAPI;
