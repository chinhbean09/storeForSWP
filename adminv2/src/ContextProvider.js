import React from "react";
import axios from "axios";
import { config } from "./components/axios/auth-header";
// Create a context
const AppContext = React.createContext();

// Create a provider component
function AppProvider({ children }) {
  const [orders, setOrders] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [stores, setStores] = React.useState([]);
  const [material, setMaterial] = React.useState([]);
  const [cloth, setCloth] = React.useState([]);
  const savedActiveLink = localStorage.getItem("activeLink") || "";
  const [activeLink, setActiveLink] = React.useState(savedActiveLink);
  const [timeCategory, setTimeCategory] = React.useState([]);

  React.useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  React.useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/base/staff/accepted-order",
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/user/all/5",
        config
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/base/store/all",
        config
      )
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/material/all",
        config
      )
      .then((response) => {
        console.log(response.data);
        setMaterial(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/time-category",
        config
      )
      .then((response) => {
        console.log(response.data);
        const filteredData = response.data.filter((item) => item.status === 1);
        setTimeCategory(filteredData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  React.useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/cloth/all",
        config
      )
      .then((response) => {
        console.log(response.data);
        setCloth(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        orders,
        setOrders,
        users,
        setUsers,
        stores,
        setStores,
        material,
        setMaterial,
        cloth,
        setCloth,
        activeLink,
        setActiveLink,
        timeCategory,
        setTimeCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
