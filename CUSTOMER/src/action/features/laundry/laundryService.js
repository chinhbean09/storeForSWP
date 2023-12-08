

import axios from 'axios';
import {base_url} from '../../../axios/baseUrl';
import { config } from '../../../axios/auth-header';


const getAllSpecialServicebyStore= async (id) => {

    const response = await
        axios.get(`${base_url}base/special-service/store/${id}`,
        config)
     
        return response.data;
}


const getStandardServicebyStore= async (id) => {

    const response = await
        axios.get(`${base_url}base/standard-service/store/${id}`,
        config)
     
        return response.data;
}


const getService= async (id) => {

    const response = await
        axios.get(`${base_url}base/service/${id}`,
        config)
     
        return response.data;
}

const laundryService = {
    getAllSpecialServicebyStore,
    getStandardServicebyStore,
    getService,
}



export default laundryService;
