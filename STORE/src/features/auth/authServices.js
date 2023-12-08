import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (userInfoDTO) => {
  const response = await axios.post(`${base_url}auth/authenticate`, userInfoDTO);
  if (response.data) {
    localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
    localStorage.setItem("userInfoDTO", JSON.stringify(response.data.userInfoDTO));
  }
  return response.data;
};

const register = async (userInfoDTO) => {
  const response = await axios.post(`${base_url}auth/register`, userInfoDTO);
  if (response.data) {
    localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
    localStorage.setItem("userInfoDTO", JSON.stringify(response.data.userInfoDTO));
  }
  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${base_url}/auth/logout`);
  
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
  logout
};

export default authService;
