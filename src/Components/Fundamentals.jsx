import React from "react";
// import { changeToUsd } from "./utils/changeToUsd";
// import AboutCoin from "./AboutCoin";
const Fundamentals = ({ coin }) => {
  const getDate = (date) => {
    const dd = new Date(date);
    const ss = dd.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return ss;
  };
  const changeToUsd = (Value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "usd",
      maximumFractionDigits: 5,
    }).format(Value);
  };
  const changeTo = (Value) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 5,
    }).format(Value);
  };
  console.log(coin);
  return (
    <>
      <p className="font-semibold py-2 text-zinc-500 text-2xl">Fundamentals</p>
      <div className="md:flex md:h-80  w-full md:justify-between  ">
        <div className="w-[98%] md:w-[45%]">
          <div className="border-b-[1px] md:h-[20%] border-zinc-400 flex justify-between p-2 py-4 items-center">
            <p className="text-zinc-400 text-sm md:text-base">
              {coin?.name?.toUpperCase()} Price
            </p>
            <p className="font-semibold text-sm md:text-base">
              {changeToUsd(coin?.market_data?.current_price?.usd)}
            </p>
          </div>
          <div className="border-b-[1px] md:md:h-[20%] border-zinc-400 flex justify-between p-2 py-4 items-center">
            <p className="text-zinc-400 text-sm md:text-base">
              24h Low / 24h High
            </p>
            <p className="font-semibold text-sm md:text-base">
              {changeToUsd(coin?.market_data?.low_24h?.usd?.toFixed(2))} /
              {changeToUsd(coin?.market_data?.high_24h?.usd?.toFixed(2))}
            </p>
          </div>

          <div className="border-b-[1px] md:h-[20%] border-zinc-400 flex justify-between p-2 py-4 items-center">
            <p className="text-zinc-400 text-sm md:text-base">Total Volume</p>
            <p className="font-semibold text-sm md:text-base">
              {changeToUsd(coin?.market_data?.total_volume?.usd)}
            </p>
          </div>
          <div className="border-b-[1px] md:h-[20%] border-zinc-400 flex justify-between p-2 py-4 items-center">
            <p className="text-zinc-400 text-sm md:text-base">Market Cap</p>
            <p className="font-semibold text-sm md:text-base">
              #{coin?.market_data?.market_cap_rank}
            </p>
          </div>
        </div>
        <div className="w-[98%] md:w-[45%] ">
          <div className="border-b-[1px] md:h-[20%] border-zinc-400 flex justify-between p-2 py-4 items-center">
            <p className="text-zinc-400 text-sm md:text-base">Market Cap</p>
            <p className="font-semibold text-sm md:text-base">
              {changeToUsd(coin?.market_data?.market_cap?.usd)}
            </p>
          </div>

          <div className="border-b-[1px] md:h-[20%] border-zinc-400 flex justify-between p-2 py-4 items-center">
            <p className="text-zinc-400 text-sm md:text-base">Total Supply</p>
            <p className="font-semibold text-sm md:text-base">
              {changeTo(coin?.market_data?.total_supply)}
            </p>
          </div>
          <div className="border-b-[1px] md:h-[20%] border-zinc-400 flex justify-between p-2 py-4 items-center">
            <p className="text-zinc-400 text-sm md:text-base">All-Time High</p>
            <div>
              <p className="font-semibold flex justify-end text-sm md:text-base">
                {changeToUsd(coin?.market_data?.ath?.usd)}
              </p>
              <p className="text-sm md:text-base">
                {getDate(coin?.market_data?.ath_date?.usd?.split("T")[0])}
              </p>
            </div>
          </div>
          <div className="border-b-[1px] md:h-[20%] border-zinc-400 flex justify-between p-2 py-4 items-center">
            <p className="text-zinc-400 text-sm md:text-base">All-Time Low</p>
            <div className="flex flex-col">
              <p className="font-semibold flex justify-end text-sm md:text-base">
                {changeToUsd(coin?.market_data?.atl?.usd)}
              </p>
              <p className="text-sm md:text-base">
                {getDate(coin?.market_data?.atl_date?.usd?.split("T")[0])}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fundamentals;
