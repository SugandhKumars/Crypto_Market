import React, { useContext } from "react";
import { CryptoContext } from "../Context/CryptoContext";

const CryptoTable = () => {
  const { CryptoData } = useContext(CryptoContext);
  console.log(CryptoData);
  return (
    <div className="max-h-[400px]">
      <table className="min-w-full">
        <thead className=" bg-gray-200 sticky top-0 ">
          <tr className="w-full mb-10">
            <th className="py-2 ">Name</th>
            <th className="py-2 ">Price</th>
            <th className="py-2 ">1h%</th>
            <th className="py-2 ">24h%</th>
            <th className="py-2 ">7d%</th>
            <th className="py-2 ">Market Cap</th>
            <th className="py-2 ">Total Volume</th>
            <th className="py-2 ">Circulating Supply</th>
            <th className="py-2 ">Last 7 Days</th>
          </tr>
        </thead>
        <tbody className=" w-full   overflow-y-auto text-center ">
          {CryptoData?.length > 0 ? (
            CryptoData.map((coin) => (
              <tr
                key={coin.id}
                className="hover:bg-zinc-200 h-14 cursor-pointer"
              >
                <td className="flex gap-2   items-center py-4 font-semibold  justify-center   ">
                  <td className="w-8 h-8 rounded-full ">
                    <img
                      className="w-full h-full rounded-full "
                      src={coin.image}
                      alt=""
                    />
                  </td>
                  <td className="text-base w-24  font-semibold">{coin.name}</td>
                </td>
                <td>{coin.current_price}</td>
                <td
                  className={`${
                    coin.price_change_percentage_1h_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_1h_in_currency}%
                </td>
                <td
                  className={`${
                    coin.price_change_percentage_24h_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h_in_currency}%
                </td>
                <td
                  className={`${
                    coin.price_change_percentage_7d_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_7d_in_currency}%
                </td>
                <td>{coin.market_cap}</td>
                <td>{coin.total_volume}</td>
                <td>{coin.circulating_supply}</td>
                <td>7 Days</td>
              </tr>
            ))
          ) : (
            <>
              <tr className="w-full h-96 justify-center items-center">
                <td className="bg-zinc-100"></td>
                <td className="bg-zinc-100"></td>
                <td className="bg-zinc-100"></td>
                <td className="bg-zinc-100"></td>
                <td className="bg-zinc-100"></td>
                <td className="bg-zinc-100">Loading.. Please Wait...</td>
                <td className="bg-zinc-100"></td>
                <td className="bg-zinc-100"></td>
                <td className="bg-zinc-100"></td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
