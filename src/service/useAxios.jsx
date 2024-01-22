import axios from "axios";

const useAxios = (token) => {
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { Authorization: `Token ${token}` },
  });

  return axiosInstance;
};

export default useAxios;

//1 contexten gelen global state burada kullanılamadığı için token bilgisine authcontext hookundan erişildi. UseAxiosa token parametresi verildi.
