import axios from 'axios';
import {base_url} from '../../../axios/baseUrl';
import { config } from '../../../axios/auth-header';


const getFilter= async (filter) => {

    const response = await
        axios.post(`${base_url}base/store/filter`,filter,
        config)
     
        return response.data;
}

    
const filterService = {
    getFilter
    // createBlogCategory,
    // deleteBlogCategory,
    // getBlogCategory,
    // deleteBlogCategory,
    // updateBlogCategory,
  };
  
  export default filterService;

