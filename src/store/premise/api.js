import axiosInstance from "@/services/api.js";

const getPremiseType = async () => {
    const params = new URLSearchParams();

    return await axiosInstance.get('/public/premise/type', {
        params
    });
};

export { getPremiseType };
