import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const isLoggedIn = localStorage.getItem('userInfoDTO') !== null
    if (!isLoggedIn) {
      return  <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };

  return  AuthRoute;
};
 
 const withAuthUser = (Component) => {
    const AuthUserRoute = (props) => {
      const { userInfoDTO } = useSelector((state) => state.auth);
        if (!userInfoDTO) {
            return <Navigate to="/login"/>
        }
        return <Component {...props}/>
    }
    return AuthUserRoute
 }
const withAllAuth = (Component) => {
    const ComponentWithAuth = withAuth(Component);
    const ComponentWithAuthUser = withAuthUser(ComponentWithAuth);
    return ComponentWithAuthUser;
}


export default withAllAuth;