import styled from "styled-components";
import Header from "./Header";
import { Layout, Affix } from "antd";

const { Footer, Sider, Content } = Layout;

const AboutUs = () => {
  return (
    <Wrapper>
      <Header />
      <div className="container">
        <div className="grid grid-three-column">
          <div className="about-data1">
            <h1 className="h2-fix">Good price</h1>
            <h4>
              Help customers proactively pay for laundry costs. Sign an annual
              price and fee contract based on monthly volume.
            </h4>

            <h1 className="h2-fix">Utilities</h1>
            <h4>
              Just call us to inform us about your laundry needs, and your time
              will be saved for your family and friends.
            </h4>
          </div>
          <div className="about-img">
            <img
              src="images/about.jpg"
              alt="about-photo"
              className="img-style1"
            />
          </div>
          <div className="about-data1">
            <h1 className="h2-fix">Fast delivery</h1>
            <h4>
              Delivery within 24 hours after receipt. Especially with the
              ability to do laundry and same-day returns in large quantities.
            </h4>
            <h1 className="h2-fix">Quality</h1>
            <h4>
              We use the best technology, hight-quality detergents with clear
              origins, and are safe for health.
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
        Ant Design ©2023 Created by Ant UED
      </Footer>{" "}
    </Wrapper>
  );
};

export default AboutUs;
const Wrapper = styled.section`
  .img-style1 {
    width: 150%;
    height: 100%;
    justify-content: center;
    padding-top: 30px;
    padding-right: 60px;
    margin-left: -100px;
  }
  .about-data1 {
    padding-top: 100px;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .h2-fix {
    padding-top: 30px;
    font-size: 45px;
    color: rgb(98 84 243);
  }
  h4 {
    font-size: 25px;
    width: 330px;
    margin-right: 20px;
  }
  .container {
    margin: auto !important;
    margin-bottom: 30px !important;
    margin-left: 8% !important;
  }
`;
