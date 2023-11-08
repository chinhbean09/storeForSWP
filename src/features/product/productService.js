import axios from "axios";
//import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";



const getProducts = async (id) => {
  console.log("Service = " + JSON.parse(localStorage.getItem('access_token')))
  const response = await axios.get(`${base_url}store/special-service/all?store=${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      'ngrok-skip-browser-warning': 'true'

    },
  });
  return response.data;
};



const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      'ngrok-skip-browser-warning': 'true'

    },
  });

  return response.data;
};


const updateStandardService = async (id,data) => {
  const res = await axios.put(`${base_url}store/standard-service/update/${id}`,data,{
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      'ngrok-skip-browser-warning': 'true'

    },
  });
  return res.data;
}
const addNewStandardService = async (data) => {
  const res = await axios.post(`${base_url}store/standard-service/create`, data, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      'ngrok-skip-browser-warning': 'true'

    },
  });
  return res.data;
}

const getStandardService = async (id) => {
  const res = await axios.get(`${base_url}store/standard-service/get?store=${id}`,{
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      'ngrok-skip-browser-warning': 'true'

    },
  });
  return res.data;
}

const productService = {
  getProducts,
  createProduct,
  updateStandardService,
  addNewStandardService,
  getStandardService 

};

export default productService;
