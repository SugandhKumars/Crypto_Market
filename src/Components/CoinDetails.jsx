import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "./Chart";
import Performance from "./Performance";
import { CryptoContext } from "../Context/CryptoContext";

const CoinDetails = () => {
  const { setCoinId, coinId, coinDetails } = useContext(CryptoContext);
  const { id } = useParams();
  const [dataType, setDataType] = useState("prices");
  const [days, setDays] = useState("7");
  const [lineCharts, setLineCharts] = useState();
  useEffect(() => {
    const getCharts = async (id) => {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily&precision=12`
      );
      const res = await data.json();
      console.log(res);
      let convertedData = res[dataType]?.map((data) => {
        return {
          date: new Date(data[0])?.toLocaleDateString(),
          [dataType]: data[1],
        };
      });
      console.log(convertedData);
      setLineCharts(convertedData);
    };
    getCharts(id);
    setCoinId(id);
  }, [id, dataType, days]);

  const changeToUsd = (Value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "usd",
      maximumFractionDigits: 5,
    }).format(Value);
  };
  return (
    <>
      {Object.keys(coinDetails).length > 0 ? (
        <div className="w-full mt-2 flex flex-col  items-center gap-2 px-auto">
          <div className="w-[90%] bg-zinc-100 p-2 rounded-lg ">
            <div className="h-32 w-full   mb-2 flex-col p-2">
              <div className="flex mb-5 md:mb-10 items-center gap-2">
                <div className="coinImage w-8 h-8   rounded-full">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={coinDetails?.image?.large}
                    alt="coin"
                  />
                </div>
                <p className="font-bold text-lg">{coinDetails?.name}</p>
                <p className="font-bold text-sm text-zinc-300">
                  {coinDetails?.symbol?.toUpperCase()}
                </p>
                <p className="bg-zinc-600 px-2 py-2 font-medium rounded-lg text-xs text-white">
                  Rank #{coinDetails?.market_cap_rank}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-bold text-3xl">
                  {changeToUsd(
                    coinDetails?.market_data?.current_price?.usd.toFixed(10)
                  )}
                </p>
                <p className="bg-green-400 bg-opacity-25 px-1 rounded-sm text-green-600 font-medium text-sm">
                  {coinDetails?.market_data?.market_cap_change_percentage_24h.toFixed(
                    2
                  )}
                  %
                </p>
                <p className="font-medium text-sm text-zinc-400">(24H)</p>
              </div>
              <p className="font-medium text-sm">
                ₹
                {changeToUsd(
                  coinDetails?.market_data?.current_price?.inr.toFixed(2)
                )}
              </p>
            </div>
            <div className="w-[98%]  Chart flex flex-col ">
              <div className=" w-[100%]   ">
                <div className=" flex w-full  my-4 justify-between">
                  <div className="flex gap-2">
                    <button
                      className={`bg-blue-200    text-xs md:text-base px-1 py-1  md:px-2 md:py-1 rounded-lg ${
                        dataType === `prices` && `bg-black text-white`
                      }`}
                      onClick={() => setDataType("prices")}
                    >
                      Price
                    </button>
                    <button
                      className={`bg-blue-200    text-xs md:text-base px-1 py-1  md:px-2 md:py-1 rounded-lg ${
                        dataType == "market_caps" && "bg-black text-white"
                      }`}
                      onClick={() => {
                        setDataType("market_caps");
                      }}
                    >
                      Market Cap
                    </button>
                    <button
                      className={`bg-blue-200    text-xs md:text-base px-1 py-1  md:px-2 md:py-1 rounded-lg ${
                        dataType == "total_volumes" && "bg-black text-white"
                      }`}
                      onClick={() => {
                        setDataType("total_volumes");
                      }}
                    >
                      Volume
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`bg-blue-200    text-xs md:text-base px-1 py-1  md:px-2 md:py-1 rounded-lg ${
                        days == 7 && "bg-black text-white"
                      }`}
                      onClick={() => {
                        setDays("7");
                      }}
                    >
                      7 Days
                    </button>
                    <button
                      className={`bg-blue-200    text-xs md:text-base px-1 py-1  md:px-2 md:py-1 rounded-lg ${
                        days == 14 && "bg-black text-white"
                      }`}
                      onClick={() => {
                        setDays("14");
                      }}
                    >
                      14 Days
                    </button>
                    <button
                      className={`bg-blue-200    text-xs md:text-base px-1 py-1  md:px-2 md:py-1 rounded-lg ${
                        days == 30 && "bg-black text-white"
                      }`}
                      onClick={() => {
                        setDays("30");
                      }}
                    >
                      30 Days
                    </button>
                  </div>
                </div>
                <Chart data={lineCharts} type={dataType} />
              </div>
            </div>
          </div>
          <Performance coin={coinDetails} />
        </div>
      ) : (
        <p>Loading....</p>
      )}
      {/* <TrndingCoins /> */}
    </>
  );
};

export default CoinDetails;
