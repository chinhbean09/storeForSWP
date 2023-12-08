import axios from "axios";
import { base_url } from "../../utils/baseUrl";


const getOrder = async (id) => {
    // console.log("Service = " + JSON.parse(localStorage.getItem('access_token')))
    const response = await axios.get(`${base_url}store/order/all?store=${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'
  
      },
    });
    return response.data;
  };
  
  
  
  
  
  const updateOrder = async (id,data) => {
    const res = await axios.put(`${base_url}store/order/update/${id}?status=${data}`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'
  
      },
    });
    return res.data;
  }


  const orderService = {
    getOrder,
    updateOrder,
  
  };
  
  export default orderService;