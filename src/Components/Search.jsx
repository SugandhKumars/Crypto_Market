import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../Context/CryptoContext";

export const Search = () => {
  const { setCoinName, coinName, isDark } = useContext(CryptoContext);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [search, setSearch] = useState([]);

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
          className={`md:border-[2px] border-[1px] outline-none rounded-md px-2 md:text-base text-xs w-[70%] md:w-64 py-1 ${
            isDark && "bg-black"
          }`}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setShowSuggestion(true);
          }}
          type="text"
        />
        <button
          type="submit"
          className={`${!isDark && "bg-blue-200"} ${
            isDark && "bg-zinc-500 text-white"
          } px-2 py-1 md:text-base text-xs md:px-2 md:py-1 rounded-lg`}
        >
          Search
        </button>
      </form>
      {showSuggestion && searchText.trim().length > 0 && (
        <div className=" z-50  w-[70%] md:w-[70%]   absolute  left-[10%] md:left-[10%] top-8 md:top-10 h-56 overflow-x-hidden backdrop-blur-md opacity-90">
          {search?.coins?.map((c) => (
            <div
              key={c.id}
              className="md:py-2 py-1 hover:bg-blue-200 flex items-center gap-2 px-2 mb-1 md:mb-2 "
              onClick={() => {
                setCoinName(c.name);
                setSearchText(c.name);
                setCoinName(searchText);
                setShowSuggestion(false);
              }}
            >
              <img
                className="w-4 h-4 md:w-6 md:h-6 rounded-full "
                src={c?.large}
                alt=""
              />
              <p className="md:font-semibold text-xs font-semibold">
                {c?.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
