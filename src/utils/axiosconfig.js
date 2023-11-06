



// console.log('headers')
export const config = {
  
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
    Accept: "application/json",
    "Access-Control-Allow-Origin":"*",
    'ngrok-skip-browser-warning': 'true'
    
  },
   
};
