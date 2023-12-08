import axios from "axios";
import { base_url } from "../../../axios/baseUrl";
import { config } from "../../../axios/auth-header";

const createOrder = async (order) => {
  const response = await axios.post(`${base_url}user/order/create`, order, {
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("access_token")
      )}`,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": "69420",
    },
  });

  return response.data;
};
const orderService = {
  createOrder,
  // createBlogCategory,
  // deleteBlogCategory,
  // getBlogCategory,
  // deleteBlogCategory,
  // updateBlogCategory,
};

export default orderService;
