import { useContext } from "react";
import CryptoTable from "./CryptoTable";
import Pagination from "./Pagination";
import { Search } from "./Search";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { CryptoContext } from "../Context/CryptoContext";

const HomePage = () => {
  const { isDark, setIsDark } = useContext(CryptoContext);
  return (
    <div className={`h-full w-full   `}>
      <div
        className={`${
          isDark && "bg-black text-white"
        } flex justify-between pr-10 items-center w-full pt-2`}
      >
        <Search />
        {isDark ? (
          <MdOutlineLightMode
            className="text-2xl mb-2 cursor-pointer"
            onClick={() => setIsDark(!isDark)}
          />
        ) : (
          <MdDarkMode
            className="text-2xl mb-2 cursor-pointer"
            onClick={() => setIsDark(!isDark)}
          />
        )}
      </div>

      <div className={`overflow-y-auto `}>
        <CryptoTable />
      </div>
      <Pagination />
    </div>
  );
};

export default HomePage;
