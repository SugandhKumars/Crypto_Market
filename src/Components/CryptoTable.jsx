import React, { useContext } from "react";
import { CryptoContext } from "../Context/CryptoContext";
import { useNavigate } from "react-router-dom";
import { MetroSpinner } from "react-spinners-kit";
const CryptoTable = () => {
  const { CryptoData, isDark } = useContext(CryptoContext);
  console.log(isDark);
  const navigate = useNavigate();
  const changeToUsd = (Value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "usd",
      maximumFractionDigits: 5,
    }).format(Value);
  };
  const handleClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };
  return (
    <div className="max-h-[700px]">
      <table className="min-w-full">
        <thead
          className={` ${!isDark && "bg-gray-200"} sticky top-0  z-30 ${
            isDark && "bg-black text-white"
          }`}
        >
          <tr className="w-full mb-10">
            <th className="md:py-2  py-1 sticky font-semibold text-sm md:text-base md:font-bold">
              Name
            </th>
            <th className="md:py-2  py-1 sticky font-semibold text-sm md:text-base md:font-bold ">
              Price
            </th>
            <th className="md:py-2  py-1 sticky font-semibold text-sm md:text-base md:font-bold ">
              1h%
            </th>
            <th className="md:py-2  py-1 sticky font-semibold text-sm md:text-base md:font-bold ">
              24h%
            </th>
            <th className="md:py-2  py-1 sticky font-semibold text-sm md:text-base md:font-bold md:sticky md:table-cell hidden">
              7d%
            </th>
            <th className="md:py-2  py-1 sticky font-semibold text-sm md:text-base md:font-bold md:sticky md:table-cell hidden">
              Market Cap
            </th>
            <th className="md:py-2  py-1 sticky font-semibold text-sm md:text-base md:font-bold md:sticky md:table-cell hidden">
              Total Volume
            </th>
            <th className="md:py-2  py-1 sticky font-semibold text-sm md:text-base md:font-bold md:sticky md:table-cell hidden">
              Circulating Supply
            </th>
            <th className="py-2  md:sticky md:table-cell hidden">
              Last 7 Days
            </th>
          </tr>
        </thead>
        <tbody className=" w-full   overflow-y-auto text-center ">
          {CryptoData?.length > 0 ? (
            CryptoData.map((coin) => (
              <tr
                key={coin.id}
                className={`${
                  isDark ? " hover:bg-zinc-600" : "hover:bg-zinc-200"
                } md:h-14 h-8 cursor-pointer  `}
                onClick={() => handleClick(coin.id)}
              >
                <td className="flex  items-center py-2 md:py-4 font-normal md:font-semibold  justify-center   ">
                  <td className="w-6 h-6 md:w-8 md:h-8 rounded-full ">
                    <img
                      className="w-full h-full rounded-full "
                      src={coin.image}
                      alt=""
                    />
                  </td>
                  <td className="md:text-base text-xs w-[60%] md:w-[50%]   font-semibold">
                    {coin.name} {coin.symbol.toUpperCase()}
                  </td>
                </td>
                <td className="md:text-base text-xs">
                  {changeToUsd(coin.current_price)}
                </td>
                <td
                  className={`md:text-base text-xs ${
                    coin.price_change_percentage_1h_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_1h_in_currency?.toFixed(5)}%
                </td>
                <td
                  className={`md:text-base text-xs ${
                    coin.price_change_percentage_24h_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h_in_currency.toFixed(5)}%
                </td>
                <td
                  className={`md:sticky md:table-cell hidden
                  ${
                    coin.price_change_percentage_7d_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_7d_in_currency.toFixed(5)}%
                </td>
                <td className="md:sticky md:table-cell hidden">
                  {changeToUsd(coin.market_cap)}
                </td>
                <td className="md:sticky md:table-cell hidden">
                  {changeToUsd(coin.total_volume)}
                </td>
                <td className="md:sticky md:table-cell hidden">
                  {coin.circulating_supply}
                  <span className=""> {coin.symbol.toUpperCase()}</span>
                </td>
                <td className="md:sticky md:table-cell hidden">7 Days</td>
              </tr>
            ))
          ) : (
            <>
              <tr className="w-full h-[500px]">
                <td className="text-center  " colSpan="9">
                  <div className="flex items-center justify-center">
                    <MetroSpinner size={40} color={"blue"} />
                    <span className="text-xl ml-2">Please Wait...</span>
                  </div>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
