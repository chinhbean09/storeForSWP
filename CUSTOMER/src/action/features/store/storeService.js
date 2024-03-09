import axios from "axios";
import { base_url } from "../../../axios/baseUrl";
import { config } from "../../../axios/auth-header";
const getAllStore = async () => {
  const response = await axios.get(`${base_url}base/store/all`, config);

  return response.data;
};
const checkEmail = async (email) => {
  const response = await axios.get(
    `${base_url}auth/check-email?email=${email}`,
    config
  );

  return response.data;
};
const getStore = async (id) => {
  const response = await axios.get(
    `http://localhost:8001/api/v1/base/store/get/${id}`,
    config
  );

  return response.data;
};

const storeService = {
  getStore,
  getAllStore,
  checkEmail,
};

export default storeService;
