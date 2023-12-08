import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:"Calibri";
}


html {
  font-size: 62.5%;
  /* scroll-behavior: smooth; */
  /* 1rem = 10px */
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
   scrollbar-color: rgb(98 84 243);
    scrollbar-width: thin;
}

body::-webkit-scrollbar {
  width: 1.5rem;
}

body::-webkit-scrollbar-track {
   background-color: rgb(24 24 29);
}

body::-webkit-scrollbar-thumb {
 
  background: #fff;
    border: 5px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
}

// h1,
// h2,
// h3,
// h4 {
//    font-family: "Work Sans", sans-serif;

// }

h1 {
  color: ${({ theme }) => theme.colors.heading};
   font-size: 4.4rem;
  font-weight: 900;
 }

  h2 {
    color: ${({ theme }) => theme.colors.heading};
   font-size: 3.2rem;
   font-weight: 300;
   white-space: normal;
  
  }

 h3 {
   font-size: 2.2rem;
   font-weight: 400;
}

p, button {
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.65rem;
  line-height: 1.5;
  font-weight:400;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}


${"" /* resuable code section  */}

.container {
  max-width: 140rem;
  margin: 0 auto;
}

.grid {
  display: grid;
  gap: 15px;
}

.grid-two-column {
  grid-template-columns: repeat(2, 1fr);

}

.grid-three-column {
  grid-template-columns: repeat(3, 1fr);
}

.grid-four-column{
   grid-template-columns: 1fr 1fr 1fr 1fr ;
}

.grid-five-column{
  grid-template-columns: repeat(5, 1fr);
}

  .common-heading {
      font-size: 3.8rem;
      font-weight: 600;
      margin-bottom: 6rem;
      text-transform: capitalize;
    }

     .intro-data {
      margin-bottom: 0;
      color: black;
    }

   .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }

input, textarea{
    max-width: 1000rem;
    color: ${({ theme }) => theme.colors.black};
    padding: 1.6rem 2.4rem;
    padding-bottom:0 !important;
    padding-top: 0 !important;
    font-size: 2rem !important;
    border: 1px solid ${({ theme }) => theme.colors.border};
   box-shadow: ${({ theme }) => theme.colors.shadowSupport};
}
    input[type="submit"]{
    max-width: 16rem;
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.colors.btn};
    color: ${({ theme }) => theme.colors.white};
    padding: 1.4rem 2.2rem;
    
    border-style: solid;
    border-width: .1rem;
    font-size: 3rem;
    cursor: pointer;
    }

@media (max-width: ${({ theme }) => theme.media.tab}) {
    .container {
    max-width: 130rem;
    padding: 0 3.2rem;
  }
  }

   @media (max-width: ${({ theme }) => theme.media.mobile}) {
       html {
      font-size: 50%;
    }

.grid{
  gap: 1rem;
}
.grid-two-column , .grid-three-column, .grid-four-column{
    grid-template-columns: 1fr;
  }
}
.cart-container {
  padding: 2rem 4rem;
}
.cart-container h2 {
  font-weight: 400;
  font-size: 35px;
  text-align: center;
}
.cart-container .titles {
  margin: 2rem 0 1rem 0;
}
.cart-container .titles h3 {
  font-size: 14px;
  font-weight: 400;
}
.cart-item,
.cart-container .titles {
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  column-gap: 0.5rem;
}
.cart-item {
  border-top: 1px solid rgb(187, 187, 187);
  padding: 1rem 0;
}
.cart-container .titles .product-title {
  padding-left: 0.5rem;
}
.cart-container .titles .total {
  padding-right: 0.5rem;
  justify-self: right;
}
.cart-item .cart-product {
  display: flex;
}
.cart-item .cart-product img {
  width: 100px;
  max-width: 100%;
  margin-right: 1rem;
}
.cart-item .cart-product h3 {
  font-weight: 400;
}
.cart-item .cart-product button {
  border: none;
  outline: none;
  margin-top: 0.7rem;
  cursor: pointer;
  background: none;
  color: gray;
}
.cart-item .cart-product button:hover {
  color: black;
}

.cart-item .cart-product-quantity {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 130px;
  max-width: 100%;
  border: 0.5px solid rgb(177, 177, 177);
  border-radius: 5px;
}
.cart-item .cart-product-quantity button {
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 2.5rem;
  cursor: pointer;
}
.cart-item .cart-product-quantity .count {
  padding: 1rem 0;
  font-size: 2rem;
}
.cart-item .cart-product-total-price {
  padding-right: 0.5rem;
  justify-self: right;
  font-weight: 700;
}

/* cart summary */
.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-top: 1px solid rgb(187, 187, 187);
  padding-top: 2rem;
}
.cart-summary .clear-btn {
  width: 130px;
  height: 40px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  border: 0.5px solid rgb(177, 177, 177);
  color: gray;
  background: none;
  outline: none;
  cursor: pointer;
}
.cart-checkout {
  width: 270px;
  max-width: 100%;
}
.cart-checkout .subtotal {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
.cart-checkout .amount {
  font-weight: 700;
}
.cart-checkout p {
  font-size: 14px;
  font-weight: 200;
  margin: 0.5rem 0;
}
.cart-checkout button {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  border: none;
  outline: none;
  cursor: pointer;
}
.continue-shopping,
.start-shopping {
  margin-top: 1rem;
}
.continue-shopping a,
.start-shopping a {
  color: gray;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.continue-shopping a span,
.start-shopping a span {
  margin-left: 0.5rem;
}
.cart-empty {
  font-size: 20px;
  margin-top: 2rem;
  color: rgb(84, 84, 84);
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
@media (max-width: 665px) {
  

  /* Cart */
  .cart-container {
    padding: 2rem;
  }
  .cart-container .titles {
    display: none;
  }
  .cart-item,
  .cart-container .titles {
    grid-template-columns: 1fr;
    row-gap: 1rem;
  }
  .cart-item .cart-product-total-price {
    justify-self: left;
  }
  .cart-summary {
    flex-direction: column;
  }
  .cart-summary .clear-btn {
    margin-bottom: 2rem;
  }
}



`;