import React, { useContext } from "react";
import { CryptoContext } from "../Context/CryptoContext";
// import { Link } from "react-router-dom";

const AboutCoin = ({ coin }) => {
  const { isDark } = useContext(CryptoContext);
  const redirectToLink = (link) => {
    window.open(link, "blank");
  };
  console.log(coin);
  return (
    <div
      className={`w-[90%] ${
        isDark ? "bg-zinc-800 text-white" : "bg-zinc-100"
      }   p-2 px-4 rounded-lg mb-4 `}
    >
      <header className="font-bold md:text-2xl md:py-2">
        About {coin?.name}
      </header>
      <div
        className={`py-1 md:py-2 md:text-xl font-bold ${
          isDark ? " text-white" : "text-zinc-800"
        } `}
      >
        What is {coin?.name}?
      </div>
      <p className="md:text-lg border-b-[1px] border-zinc-300 pb-2 md:pb-4">
        {coin?.description?.en
          .replace(/<[^>]*>?/gm, "")
          .replace(/[^\w\s]/gi, "")}
      </p>
      <div className="border-b-[1px] border-zinc-400 py-2 pb-4 md:pb-6">
        <p className="font-semibold md:text-lg md:py-2">Official Links</p>
        <div className="flex gap-2">
          <button
            className={`px-1 py-1 ${
              isDark ? "bg-zinc-700" : "bg-zinc-300"
            } rounded-lg hover:bg-zinc-500 transition-all text-sm md:text-base`}
            onClick={() => redirectToLink(coin?.links?.homepage[0])}
          >
            Website
          </button>

          <button
            className={`px-1 py-1 ${
              isDark ? "bg-zinc-700" : "bg-zinc-300"
            } rounded-lg hover:bg-zinc-500 transition-all text-sm md:text-base`}
            onClick={() => redirectToLink(coin?.links?.whitepaper)}
          >
            Whitepaper
          </button>
          <button
            className={`px-1 py-1 ${
              isDark ? "bg-zinc-700" : "bg-zinc-300"
            } rounded-lg hover:bg-zinc-500 transition-all text-sm md:text-base`}
            onClick={() => redirectToLink(coin?.links?.repos_url?.github[0])}
          >
            Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutCoin;
