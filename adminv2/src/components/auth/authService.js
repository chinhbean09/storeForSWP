import axios from "axios";
import { base_url } from "../axios/baseUrl";
// import {config} from '../../../axios/auth-header';
// import { coneMonochromacy } from '@cloudinary/url-gen/qualifiers/simulateColorBlind';
const login = async (userInfoDTO) => {
  const response = await axios.post(
    `${base_url}auth/admin/authenticate`,
    userInfoDTO
  );
  if (response.data) {
    localStorage.setItem(
      "userInfoDTO",
      JSON.stringify(response.data.userInfoDTO)
    );
    localStorage.setItem(
      "access_token",
      JSON.stringify(response.data.access_token)
    );
  }
  return response.data;
};
const register = async (userInfoDTO) => {
  const response = await axios.post(
    `${base_url}userInfoDTO/register`,
    userInfoDTO
  );
  if (response.data) {
    localStorage.setItem(
      "userInfoDTO",
      JSON.stringify(response.data.userInfoDTO)
    );
    localStorage.setItem(
      "access_token",
      JSON.stringify(response.data.access_token)
    );
  }
  return response.data;
};
const logout = async () => {
  const response = await axios.get(`${base_url}/auth/logout`);
  return response.data;
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
