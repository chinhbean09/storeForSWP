import axios from 'axios';
import {base_url} from '../../../axios/baseUrl';
import { config } from '../../../axios/auth-header';


const getMaterials = async () => {

    const response = await
        axios.get(`${base_url}base/material/all`,config)
     
        return response.data;
}

    
const materialService = {
    getMaterials
    // createBlogCategory,
    // deleteBlogCategory,
    // getBlogCategory,
    // deleteBlogCategory,
    // updateBlogCategory,
  };
  
  export default materialService;

