import React, { useContext, useState } from "react";
import { CryptoContext } from "../Context/CryptoContext";

const Pagination = () => {
  const { setPage, allCoin } = useContext(CryptoContext);
  const [currentPage, setCurrentPage] = useState(1);
  setPage(currentPage);
  let lastPage = 30;
  if (allCoin.length > 0) lastPage = Math.ceil(allCoin.length / 20);
  const PrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const NextPage = () => {
    if (currentPage + 2 <= lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const multiNextPage = () => {
    if (currentPage + 2 >= lastPage) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(currentPage + 2);
    }
  };
  const multiPrevPage = () => {
    if (currentPage - 2 <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 2);
    }
  };

  return (
    <ul className="flex justify-center mt-4 font-bold gap-1 ">
      <li
        className={` px-2 py-1 hover:bg-blue-300 hover:bg-opacity-40 rounded-lg ${
          currentPage == 1 && "cursor-not-allowed"
        }`}
        onClick={PrevPage}
      >
        Prev
      </li>
      {currentPage >= 3 && (
        <li
          className=" px-2 py-1 hover:bg-blue-300 hover:bg-opacity-40 rounded-lg"
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          1
        </li>
      )}
      {currentPage > 3 && (
        <li
          className={` px-2 py-1 hover:bg-blue-300 hover:bg-opacity-40 rounded-lg   `}
          onClick={multiPrevPage}
        >
          ...
        </li>
      )}

      {currentPage - 1 !== 0 && (
        <li
          className=" px-2 py-1 hover:bg-blue-300 hover:bg-opacity-40 rounded-lg"
          onClick={PrevPage}
        >
          {currentPage - 1}
        </li>
      )}
      <li className=" px-2 py-1    bg-blue-500 text-white rounded-lg">
        {currentPage}
      </li>
      {currentPage + 1 < lastPage && (
        <li
          className=" px-2 py-1 hover:bg-blue-300 hover:bg-opacity-40 rounded-lg"
          onClick={NextPage}
        >
          {currentPage + 1}
        </li>
      )}
      {currentPage < lastPage && (
        <li
          className={` px-2 py-1 hover:bg-blue-300 hover:bg-opacity-40 rounded-lg   `}
          onClick={multiNextPage}
        >
          ...
        </li>
      )}
      {currentPage < lastPage && (
        <li
          className={` px-2 py-1 hover:bg-blue-300 hover:bg-opacity-40 rounded-lg   `}
          onClick={() => {
            setCurrentPage(lastPage);
          }}
        >
          {lastPage}
        </li>
      )}
      <li
        className={` px-2 py-1 hover:bg-blue-300 hover:bg-opacity-40 rounded-lg ${
          currentPage == lastPage && "cursor-not-allowed"
        }  `}
        onClick={NextPage}
      >
        Next
      </li>
    </ul>
  );
};

export default Pagination;
