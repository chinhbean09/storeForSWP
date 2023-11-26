import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';
import { async } from 'q';
const withAuth = (Component) => {
  const AuthRoute = (props) => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa (thông qua thông tin đã lưu trữ)
    const isLoggedIn = localStorage.getItem('userInfoDTO') !== null

    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    // Nếu đã đăng nhập, render component mong muốn
    return <Component {...props}/>;
  };

  return AuthRoute;
};

export default withAuth;
