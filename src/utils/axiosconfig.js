const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
// console.log('headers')
export const config = {
  
  headers: {
    Authorization: `Bearer ${
    getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.access_token: ""
    
  }`,
    Accept: "application/json",
    "Access-Control-Allow-Origin":"*",
    'ngrok-skip-browser-warning': 'true'
    
  },
   
};
