import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../Context/CryptoContext";

export const Search = () => {
  const { setCoinName, coinName } = useContext(CryptoContext);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [search, setSearch] = useState([]);
  console.log(coinName);
  const [searchText, setSearchText] = useState("");
  const getSearch = async () => {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${searchText}`
    );
    const res = await data.json();
    setSearch(res);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      getSearch();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);
  return (
    <div className="mb-3 relative">
      <form
        action=""
        className="flex ml-10 items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setShowSuggestion(false);
          setCoinName(searchText);
        }}
      >
        <input
          className="border-[2px] outline-none rounded-md px-2 w-64 py-1"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setShowSuggestion(true);
          }}
          type="text"
        />
        <button type="submit" className="bg-blue-200 px-2 py-1 rounded-lg">
          Search
        </button>
      </form>
      {showSuggestion && searchText.trim().length > 0 && (
        <div className=" w-[25%]   absolute z-30 left-[3%] top-10 h-56 overflow-x-hidden backdrop-blur-md opacity-90">
          {search?.coins?.map((c) => (
            <div
              key={c.id}
              className="py-2 hover:bg-red-300 flex items-center gap-2 px-2 mb-2 "
              onClick={() => {
                setCoinName(c.name);
                setSearchText(c.name);
                setCoinName(searchText);
                setShowSuggestion(false);
              }}
            >
              <img className="w-6 h-6 rounded-full " src={c?.large} alt="" />
              <p className="font-semibold">{c?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
