import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const createStore = async (data) => {
    const res = await axios.post(`${base_url}store/create`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'
      },
    });
    return res.data;
  }

  const updateStore = async (id,data) => {
    const res = await axios.put(`${base_url}store/update/${id}`,data,{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'
      },
    });
    return res.data;
  }
  const getStore = async (id) => {
    const res = await axios.get(`${base_url}store/get?store=${id}`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'
      },
    });
    return res.data;
  }
  
  const storeService = {
    createStore,
    updateStore,
    getStore
  };
  
  export default storeService;
