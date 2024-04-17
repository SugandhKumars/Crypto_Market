import CryptoTable from "./CryptoTable";
import Pagination from "./Pagination";
import { Search } from "./Search";

const HomePage = () => {
  return (
    <div className="h-full w-full my-2">
      <Search />
      <div className="overflow-y-auto">
        <CryptoTable />
      </div>
      <Pagination />
    </div>
  );
};

export default HomePage;
