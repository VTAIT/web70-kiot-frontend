import axiosInstance from "./axiosInstance";

const kiotAPI = {
    getAll: () => axiosInstance.get("/kiot"),
    getById: () => axiosInstance.get("/kiot/getById"),
    update: (kiot) => axiosInstance.post("/kiot/update",kiot),
};

export default kiotAPI;
