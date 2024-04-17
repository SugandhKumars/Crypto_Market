import React, { createContext, useEffect, useState } from "react";
export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [CryptoData, setCryptoData] = useState([]);
  const [page, setPage] = useState(1);
  const [allCoin, setAllCoin] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=10`
    );

    const res = await data.json();
    console.log(res);
    setCryptoData(res);
  };
  useEffect(() => {
    getData();
  }, [page]);

  const getAllCOins = async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
    const res = await data.json();
    setAllCoin(res);
  };
  useEffect(() => {
    getAllCOins();
  }, []);

  return (
    <CryptoContext.Provider
      value={{
        CryptoData,
        setPage,
        allCoin,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
