import React from "react";
import { Layout, Affix } from "antd";
import FilterForm from "../FilterForm";
import StoreList from "../StoreList";
import styled from "styled-components";
import HeroSection from "../HeroSection";
// import withAllAuth from "../withAllAuth";
import Header from "../Header";

const { Footer, Sider, Content } = Layout;

const MainLayout = (children) => {
  const { filter, content, section } = children;

  return (
    <Wrapper>
      <Affix offsetTop={0} onChange={(affixed) => console.log(affixed)}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
        </Header>
      </Affix>

      <Content>
        <Layout style={{ minHeight: "91vh", position: "relative" }} hasSider>
          <FilterForm />
          <Content>
            <HeroSection />
            <StoreList />
          </Content>
        </Layout>
      </Content>
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
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default MainLayout;
