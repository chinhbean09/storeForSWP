import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import Dropdown from "react-bootstrap/Dropdown";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../action/features/cart/cartSlice";
import { logout } from "../action/features/auth/authSlice";


const Nav = () => {
  const { userInfoDTO } = useSelector((state) => state.auth);
  const [menuIcon, setMenuIcon] = useState();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);


  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.white};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.black};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;
      

      .cart-trolley {
        position: relative;
        font-size: 5.2rem;
        height:38px;
        width:38px;
      }

      .cart-total--item {
        font-size: 2rem;
        width: 2.6rem;
        height: 2.6rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -28%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          font-size: 5.2rem;
          height:20px;
          width:20px;
        }

        .cart-total--item {
          width: 3rem;
          height: 3rem;
          font-size: 2rem;

        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <div className="navbar-lists">
          <div style={{ color: 'white', fontSize: '35px' }}>
            <NavLink to="/cart" className="navbar-link cart-trolley--link">
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item"> {cart.cartTotalQuantity} </span>
            </NavLink>
          </div>
          
          <div style={{ color: 'white', fontSize: '25px', width: '' }}>


            <li style={{ color: 'white' }}>

              {userInfoDTO === null ? (<Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic" style={{ fontSize: '22px' }}>

                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: '200px', height: 'auto', fontSize: '18px' }}>
                  <Dropdown.Item href="/USER">SignUp</Dropdown.Item>

                  <Dropdown.Item href="/login">Login</Dropdown.Item>



                </Dropdown.Menu>


              </Dropdown>) : (<div className="d-flex gap-3 align-items-center dropdown">
                {userInfoDTO.fullName}
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic" style={{ fontSize: '22px' }}>

                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ width: '200px', height: 'auto', fontSize: '18px' }}>

                    <Dropdown.Item href="/profilelayout/profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="/profilelayout/history">Order History</Dropdown.Item>


                    <Dropdown.Item href="/" onClick={() => dispatch(logout())} >Logout</Dropdown.Item>


                  </Dropdown.Menu>
                </Dropdown></div>)}

            </li>

          </div>

        </div>


        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Nav>
  );
};

export default Nav;