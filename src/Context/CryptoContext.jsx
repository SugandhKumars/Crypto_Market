import React, { createContext, useEffect, useState } from "react";
export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [CryptoData, setCryptoData] = useState([]);
  const [coinName, setCoinName] = useState("");
  const [page, setPage] = useState(1);
  const [allCoin, setAllCoin] = useState([]);
  const [coinDetails, setCoinDetails] = useState({});
  const [coinId, setCoinId] = useState("bitcoin");
  const getData = async () => {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinName.toLowerCase()}&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=10`
    );

    const res = await data.json();

    setCryptoData(res);
  };
  useEffect(() => {
    getData();
    console.log("Table DAta");
  }, [page, coinName]);

  const getAllCOins = async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
    const res = await data.json();
    setAllCoin(res);
  };
  useEffect(() => {
    console.log("ALL Coins Length");
    getAllCOins();
  }, []);
  const getCoinsData = async () => {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&market_data=true&community_data=true&sparkline=true`
    );
    const res = await data.json();
    console.log(res);
    setCoinDetails(res);
  };
  useEffect(() => {
    if (coinId.trim().length > 0) getCoinsData();
    console.log("Coins Details");
  }, [coinId]);

  return (
    <CryptoContext.Provider
      value={{
        CryptoData,
        setPage,
        setCoinName,
        coinName,
        allCoin,
        coinDetails,
        setCoinId,
        coinId,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
