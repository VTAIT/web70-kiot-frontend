import axiosInstance from "./axiosInstance";

const kiotAPI = {
    getKiot: () => axiosInstance.get("/kiot"),
};

export default kiotAPI;
