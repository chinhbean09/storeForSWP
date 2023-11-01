import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (userInfoDTO) => {
  const response = await axios.post(`${base_url}auth/authenticate`, userInfoDTO);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const register = async (userInfoDTO) => {
  const response = await axios.post(`${base_url}userInfoDTO/register`, userInfoDTO);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}userInfoDTO/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}userInfoDTO/getorderbyuserInfoDTO/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  register,
  getOrders,
  getOrder,
};

export default authService;
