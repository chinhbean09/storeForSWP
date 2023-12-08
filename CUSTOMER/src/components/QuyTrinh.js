import styled from "styled-components";
import Header from "./Header";
import { MdLaptopMac } from "react-icons/md";
import { FaMoneyBillWave, FaTshirt, FaMotorcycle } from "react-icons/fa";
import { Layout } from "antd";
const { Footer } = Layout;

const QuyTrinh = () => {
  return (
    <Wrapper>
      <Header />
      <div className="container">
        <h1 style={{ textAlign: "center", margin: "50px" }}>
          Operating Procedure
        </h1>
        <div className="grid grid-four-column">
          <div className="about-data1">
            <div className="icon">
              <MdLaptopMac />
            </div>
            <h1 className="h2-fix">Book a service</h1>
            <h4>
            Easily in seconds with our Website &; Hotline (0936.277.993)
            </h4>
          </div>
          <div className="about-data1">
            <div className="icon">
              <FaMotorcycle />
            </div>
            <h1 className="h2-fix">Get Stuff</h1>
            <h4>
            We pick up items door-to-door, at the time most convenient for you -
            8AM-9PM daily in HCMC
            </h4>
          </div>
          <div className="about-data1">
            <div className="icon">
              <FaTshirt />
            </div>
            <h1 className="h2-fix">Washing & Cleaning</h1>
            <h4>
            Not only premium quality washing & cleaning, we take care
            Take care of each of your items
            </h4>
          </div>
          <div className="about-data1">
            <div className="icon">
              <FaMoneyBillWave />
            </div>
            <h1 className="h2-fix">Delivery & Payment</h1>
            <h4>
            Your clean and fragrant items will be delivered to your door - 8AM-9PM
            every day in Ho Chi Minh City
            </h4>
          </div>
        </div>
      </div>
      <Footer
        style={{
          textAlign: "center",
          background: "#1874fc",
          color: "white",
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        The Laundry ©2023 Created by Team 5
      </Footer>{" "}
    </Wrapper>
  );
};

export default QuyTrinh;
const Wrapper = styled.section`
  .img-style1 {
    width: 190%;
    height: 90%;
    justify-content: center;
    padding-top: 30px;
    padding-right: 60px;
    margin-left: -100px;
  }
  .container {
    padding-left: 30px;
    margin: auto !important;
    margin-bottom: 50px !important;
  }
  .about-data1 {
    width: 300px;
    padding-top: 100px;
    padding-bottom: 10px;
    padding-left: 20px;
    border-radius: 10px;
    border: 2px dashed #000;
    padding: 10px;
    background-color: rgba(248, 173, 61, 0.723);
  }
  .h2-fix {
    padding-top: 30px;
  }
  .container {
    margin: 30px;
  }
`;
