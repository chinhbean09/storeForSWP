import React from "react";
import { Chart } from "react-google-charts";
import { useContext } from "react";
import { AppContext } from "../../../ContextProvider";

export const options = {
  chart: {
    title: "Order number by day",
  },
};

const LineChart = () => {
  const { orders } = useContext(AppContext);
  const dateOccurrences = orders.reduce((acc, order) => {
    acc[order.date] = (acc[order.date] || 0) + 1;
    return acc;
  }, {});
  const arrayOfArrays = Object.entries(dateOccurrences);

  arrayOfArrays.sort((a, b) => {
    const dateA = new Date(a[0].split(" - ").reverse().join("-"));
    const dateB = new Date(b[0].split(" - ").reverse().join("-"));

    return dateA - dateB;
  });
  arrayOfArrays.unshift(["Day", "Order"]);

  return (
    <>
      <Chart
        chartType="Line"
        width="90%"
        height="290px"
        data={arrayOfArrays}
        options={options}
      />
    </>
  );
};

export default LineChart;
