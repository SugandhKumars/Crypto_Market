import CryptoTable from "./CryptoTable";
import Pagination from "./Pagination";

const HomePage = () => {
  return (
    <div className="h-[1200px] w-full ">
      <div className="overflow-y-auto">
        <CryptoTable />
      </div>
      <Pagination />
    </div>
  );
};

export default HomePage;
