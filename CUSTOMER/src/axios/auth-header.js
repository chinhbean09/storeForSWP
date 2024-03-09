
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
console.log('headers')
export const config = {
  
  headers: {
  
     Accept: "application/json",
    "Access-Control-Allow-Origin":"*",
    'ngrok-skip-browser-warning': '69420'
    
  },
   
};