import axiosInstance from "./axiosInstance";

const accountAPI = {
  getAllAccept: () => axiosInstance.get("/account/accept"),
  acceptById: (values) => axiosInstance.post("/account/accept", values),
  getById: () => axiosInstance.get("/account/getById"),
  getAll: () => axiosInstance.get("/account"),
  create: (values) => axiosInstance.post("/account/create", values),
  update: (values) => axiosInstance.post("/account/update", values),
};

export default accountAPI;
