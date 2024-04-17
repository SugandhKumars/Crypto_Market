import React, { createContext, useEffect, useState } from "react";
export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [CryptoData, setCryptoData] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=10`
    );
    let n =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=12";
    const res = await data.json();
    console.log(res);
    setCryptoData(res);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <CryptoContext.Provider
      value={{
        CryptoData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
