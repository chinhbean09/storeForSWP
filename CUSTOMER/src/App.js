import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./style/GlobalStyle";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainLayout from "./components/layout/MainLayout";
import FilterForm from "./components/FilterForm";
import StoreList from "./components/StoreList";
import DetailForm from "./components/StandardDetailForm";
import SpecialDetailForm from "./components/SpecialDetailForm";
import StandardDetailForm from "./components/StandardDetailForm";
import { useEffect } from "react";
import Cart from "./components/Cart";
import "react-toastify/dist/ReactToastify.css";
import SingleStore from "./components/SingleStore";
import HeroSection from "./components/HeroSection";
import ProfileLayout from "./components/layout/ProfileLayout";
import Profile from "./components/Profile";
import History from "./components/History";
import AboutUs from "./components/AboutUs";
import Quytrinh from "./components/QuyTrinh";
import Contact from "./components/Contact";
import OrderDetails from "./components/OrderDetail";
import DetailLayout from "./components/layout/DetailLayout";
import FeedbackForm from "./components/FeedbackForm";
import { FeedbackProvider } from "./components/context/FeedbackContext";
import FeedbackList from "./components/FeedbackList";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <FeedbackProvider>
        <Router>
          <ToastContainer />
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout
                  filter={<FilterForm />}
                  content={<StoreList />}
                  section={<HeroSection />}
                />
              }
            />
            <Route
              path="/single-store/:id"
              element={<DetailLayout content={<SingleStore />} />}
            />
            <Route
              path="/single-service/:id"
              element={<DetailLayout content={<SpecialDetailForm />} />}
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/quytrinh" element={<Quytrinh />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<Login />} />
            <Route exact path="/SignUp" element={<SignUp />} />

            <Route path="/profilelayout" element={<ProfileLayout />}>
              <Route path="/profilelayout/profile" element={<Profile />} />
              <Route path="/profilelayout/history" element={<History />} />
              <Route path="history/:id" element={<OrderDetails />} />
              <Route path="feedback/:id" element={<FeedbackForm />} />
              <Route path="myFeedback" element={<FeedbackList />} />
            </Route>
            <Route path="/cart" element={<DetailLayout content={<Cart />} />} />
            <Route path="/standard" element={<StandardDetailForm />} />
            <Route path="/special" element={<SpecialDetailForm />} />
          </Routes>
        </Router>
      </FeedbackProvider>
    </ThemeProvider>
  );
};

const theme = {
  colors: {
    heading: "rgb(24 24 29)",
    text: "rgba(29 ,29, 29, .8)",
    white: "#fff",
    black: " #212529",
    helper: "#8490ff",

    bg: "#F6F8FA",
    footer_bg: "#0a1435",
    btn: "rgb(98 84 243)",
    border: "rgba(98, 84, 243, 0.5)",
    hr: "#ffffff",
    gradient:
      "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
    shadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
    shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  media: {
    mobile: "768px",
    tab: "998px",
  },
};

export default App;
