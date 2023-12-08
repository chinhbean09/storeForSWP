import React from "react";
import axios from "axios";
// Create a context
const OrderContext = React.createContext();

// Create a provider component
function OrderProvider({ children }) {
  const [orders, setOrders] = React.useState([]);
  const [pendingOrders, setPendingOrders] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/base/staff/shipping-order",
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        const ordersWithStatus3OrAbove = response.data.filter(
          (order) => order.status !== 2
        );
        setOrders(ordersWithStatus3OrAbove);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        const ordersWithStatus2 = response.data.filter(
          (order) => order.status === 2
        );
        setPendingOrders(ordersWithStatus2);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Pass both orders and setOrders in the value prop
  return (
    <OrderContext.Provider
      value={{ orders, setOrders, pendingOrders, setPendingOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };
