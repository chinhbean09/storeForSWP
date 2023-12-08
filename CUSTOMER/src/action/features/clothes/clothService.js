import axios from 'axios';
import {base_url} from '../../../axios/baseUrl';
import { config } from '../../../axios/auth-header';


const getClothes = async () => {

    const response = await
        axios.get(`${base_url}base/cloth/all`,config)
     
        return response.data;
}

    
const clothService = {
    getClothes
    // createBlogCategory,
    // deleteBlogCategory,
    // getBlogCategory,
    // deleteBlogCategory,
    // updateBlogCategory,
  };
  
  export default clothService;

