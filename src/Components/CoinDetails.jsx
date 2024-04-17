import React, { useContext, useEffect, useState } from "react";
// import { CryptoContext } from "../CryptoContext";
import { useParams } from "react-router-dom";
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
      <LineChart width={500} height={300} data={data}>
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

const CoinDetails = () => {
  const { id } = useParams();

  const [dataType, setDataType] = useState("prices");
  const [days, setDays] = useState("7");
  const [lineCharts, setLineCharts] = useState();
  console.log(dataType);
  useEffect(() => {
    const getCharts = async (id) => {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily&precision=12`
      );
      const res = await data.json();
      console.log(res);
      console.log(dataType);
      let convertedData = res[dataType]?.map((data) => {
        return {
          date: new Date(data[0])?.toLocaleDateString(),
          [dataType]: data[1],
        };
      });
      console.log(dataType);
      console.log(convertedData);
      setLineCharts(convertedData);
    };
    getCharts(id);
  }, [id, dataType, days]);

  return (
    <>
      <div className="px-10 w-full">
        Charts{id}
        <Chart data={lineCharts} type={dataType} />
        <div className=" flex gap-2 mt-4">
          <button
            className="bg-blue-200 px-2 py-1 rounded-lg"
            onClick={() => setDataType("prices")}
          >
            Price
          </button>
          <button
            className="bg-blue-200 px-2 py-1 rounded-lg"
            onClick={() => {
              setDataType("market_caps");
            }}
          >
            Market Cap
          </button>
          <button
            className="bg-blue-200 px-2 py-1 rounded-lg"
            onClick={() => {
              setDataType("total_volumes");
            }}
          >
            Volume
          </button>
          <button
            className="bg-blue-200 px-2 py-1 rounded-lg"
            onClick={() => {
              setDays("7");
            }}
          >
            7 Days
          </button>
          <button
            className="bg-blue-200 px-2 py-1 rounded-lg"
            onClick={() => {
              setDays("14");
            }}
          >
            14 Days
          </button>
          <button
            className="bg-blue-200 px-2 py-1 rounded-lg"
            onClick={() => {
              setDays("30");
            }}
          >
            30 Days
          </button>
        </div>
      </div>
    </>
  );
};

export default CoinDetails;
