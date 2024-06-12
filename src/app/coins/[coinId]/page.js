"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faArrowTurnUp,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { fetchCoinChartData } from "@/app/page";
import CoinBaseLineChart from "@/components/CoinBaseLineChart";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";

const fetchCoinData = async (coinId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/coins/markets?vs_currency=usd&ids=${coinId}`,
    {
      headers: {
        "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGEEKO_API_KEY,
        accept: "application/json",
      },
    }
  );
  return response.json();
};

export default function CoinDetails({ params }) {
  const [chartData, setChartData] = useState([]);
  const [coinData, setCoinData] = useState(null);

  const updateData = useCallback(async () => {
    const coinData = await fetchCoinData(params.coinId);
    setCoinData(coinData[0]);

    const chartData = await fetchCoinChartData(params.coinId);
    setChartData(chartData);
  }, [params.coinId]);
  const router = useRouter();
  useEffect(() => {
    updateData();
    const intervalId = setInterval(() => {
      router.refresh();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [router, updateData]);

  return (
    <main className="container">
      <div className="mt-8 mx-8">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>

      <div className="flex flex-row items-center justify-between px-8">
        <div className="p-8">
          <span className="bg-blue-800 text-white  text-m font-medium me-2 px-3 py-2 rounded dark:bg-blue-900 dark:text-blue-300">
            Rank #{coinData?.market_cap_rank}
          </span>
          <div className="flex py-4 items-center">
            <img
              src={coinData?.image}
              alt={coinData?.name}
              className="w-7 h-7 mr-2"
            />
            <h1 className="text-2xl mr-2 font-bold">{coinData?.name}</h1>
            <h1 className="text-xl pt-1 text-gray-500 dark:text-gray-400">
              {coinData?.symbol.toUpperCase()}
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="text-3xl mr-2 font-bold">
              ${coinData?.current_price}
            </h1>
            {coinData?.price_change_percentage_24h > 0 ? (
              <span className="pt-1 text-xl text-green-500 font-bold">
                <FontAwesomeIcon icon={faCaretUp} />
                {coinData?.price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className="pt-1 text-xl text-red-500 font-bold">
                <FontAwesomeIcon icon={faCaretDown} />
                {coinData?.price_change_percentage_24h.toFixed(2)}%
              </span>
            )}
          </div>
          <div className="mt-4 flex text-m text-gray-500 dark:text-gray-400">
            1.00000000 {coinData?.symbol.toUpperCase()}{" "}
            <FontAwesomeIcon className="pl-1" icon={faArrowTurnUp} />
          </div>
          <div className="mt-4 flex items-center">
            <span class=" bg-gray-100 text-gray-700 text-sm font-medium me-2 px-3 py-2 rounded dark:bg-blue-900 dark:text-blue-300">
              <FontAwesomeIcon className="pr-1 text-yellow-400" icon={faStar} />
              Total Supply: {coinData?.total_supply}
            </span>
          </div>
        </div>
        <div
          className="flex flex-column items-center content-center"
          style={{ width: "40vw" }}
        >
          <CoinBaseLineChart data={chartData} />
        </div>
      </div>
      <div
        className="flex flex-column items-center content-center justify-center"
        style={{ width: "100vw" }}
      >
        <div className="flex items-center content-center">
          <a className="block w-72 h-32 m-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-blue-800 dark:text-white">
              Market Cap
            </h1>
            <p className="font-bold text-gray-700 dark:text-gray-400">
              ${coinData?.market_cap.toLocaleString()}
            </p>
          </a>
          <a className="block w-72 h-32 m-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-blue-800 dark:text-white">
              24h Trading Vol
            </h1>
            <p className="font-bold text-gray-700 dark:text-gray-400">
              ${coinData?.total_volume.toLocaleString()}
            </p>
          </a>
          <a className="block w-72 h-32 m-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-blue-800 dark:text-white">
              Fully Diluted Valuation
            </h1>
            <p className="font-bold text-gray-700 dark:text-gray-400">
              ${coinData?.fully_diluted_valuation.toLocaleString()}
            </p>
          </a>
          <a className="block w-72 h-32 m-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-blue-800 dark:text-white">
              Circulating Supply
            </h1>
            <p className="font-bold text-gray-700 dark:text-gray-400">
              {coinData?.circulating_supply.toLocaleString()}{" "}
              {coinData?.symbol.toUpperCase()}
            </p>
          </a>
        </div>
      </div>
      <div
        className="flex flex-column items-center content-center justify-center"
        style={{ width: "100vw" }}
      >
        <div className="flex items-center content-center ">
          <a className="block w-72 h-32 m-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-blue-800 dark:text-white">
              High 24h
            </h1>
            <p className="font-bold text-green-600 dark:text-gray-400">
              ${coinData?.high_24h.toLocaleString()}
            </p>
          </a>
          <a className="block w-72 h-32 m-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-blue-800 dark:text-white">
              Low 24h
            </h1>
            <p className="font-bold text-red-600 dark:text-gray-400">
              ${coinData?.low_24h.toLocaleString()}
            </p>
          </a>
          <a className="block w-72 h-32 m-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-blue-800 dark:text-white">
              Max Supply
            </h1>
            <p className="font-bold text-gray-700 dark:text-gray-400">
              ${coinData?.total_supply.toLocaleString()}
            </p>
          </a>
          <a className="block w-72 h-32 m-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-blue-800 dark:text-white">
              Market Cap Change
            </h1>
            {coinData?.market_cap_change_percentage_24h > 0 ? (
              <p className="font-bold text-green-600 dark:text-gray-400">
                {coinData?.market_cap_change_percentage_24h.toLocaleString()}
                {"%"}
              </p>
            ) : (
              <p className="font-bold text-red-600 dark:text-gray-400">
                {coinData?.market_cap_change_percentage_24h.toLocaleString()}
                {"%"}
              </p>
            )}
          </a>
        </div>
      </div>
    </main>
  );
}
