import { Chart } from "react-google-charts";
import { useContext } from "react";
import { AppContext } from "../../../ContextProvider";

const colors = [
  "#E57373",
  "#9575CD",
  "#64B5F6",
  "#4DB6AC",
  "#FFF176",
  "#FF8A65",
  "#90A4AE",
];

export const options = {
  backgroundColor: "transparent",
  is3D: true,
};

const CategoryPieChart = () => {
  const { orders } = useContext(AppContext);
  const categories = [
    ["Status", "Number"],
    ["Washing", orders.filter((item) => item.status === "washing").length],
    [
      "Delivering",
      orders.filter((item) => item.status === "delivering").length,
    ],
    ["Canceled", orders.filter((item) => item.status === "cancel").length],
    ["Finished", orders.filter((item) => item.status === "delivered").length],
  ];

  return (
    <>
      <h2>Order status</h2>
      <Chart
        chartType="PieChart"
        data={categories}
        options={options}
        colors={colors}
        height={"243px"}
        width={"500px"}
        className="custom-pie-chart"
      />
    </>
  );
};

export default CategoryPieChart;
