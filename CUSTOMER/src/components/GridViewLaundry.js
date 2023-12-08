

import React from "react";
import styled from "styled-components";
import LaundryCard from "./LaundryCard";
//import { Col, Divider, Row } from 'antd';


const GridViewLaundry = ({ data }) => {
 

  if (!Array.isArray(data) || data.length === 0) {

    return (
      <div style={{ opacity: "40%" }} className="h4 d-flex justify-content-center" >
        <p>Could not find data !</p>
      </div>
    );
  }
 

  return (

   
    <Wrapper className="section">
      <div className="container grid grid-three-column">
        {data.map((curElem) => {
          return <LaundryCard key={curElem.id} {...curElem} />;
        })}
      </div>
    </Wrapper>




  );

};
const Wrapper = styled.section`
  padding: 4rem 0;
  
  .container {
    max-width: 120rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 100%;
      margin-top: 1.5rem;
      height: 30rem;
      transition: all 0.2s linear;
    }
  }

  .card {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    width: 32rem;
    height: 40rem;

    .card-data {
      padding: 0 1rem;
    }

    .card-data-flex {
      margin: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }
`;


export default GridViewLaundry;