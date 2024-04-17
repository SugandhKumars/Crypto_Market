import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: currency,
        }).format(payload[0]?.value)}`}</p>
      </div>
    );
  }

  return null;
}
const Chart = ({ data, type }) => {
  return (
    <>
      <LineChart width={1000} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#8884d8"
          strokeWidth={"2px"}
        />
        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} hide domain={["auto", "auto"]} />
        <Line type="monotone" stroke="#14ffec" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip
          content={<CustomTooltip />}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
    </>
  );
};

export default Chart;
