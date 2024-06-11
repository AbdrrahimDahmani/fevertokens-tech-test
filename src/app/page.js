/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { createChart, CrosshairMode } from "lightweight-charts";
const fetchCoins = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=2&sparkline=false&locale=en",
      {
        headers: {
          "x-cg-demo-api-key": "CG-aVR2Qp2ACRFuSpBrXwDcZfTm",
          accept: "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const coins = await fetchCoins();
  console.log(coins.length);
  return (
    <main className="flex  flex-col items-center justify-between p-5">
      <div className="flex flex-col items-center justify-between p-8">
        <h1 className="text-4xl font-bold">Welcome to the Coins Catalog</h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Coin
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Price</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Market cap </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">24h price change</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Rank</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.length > 0 ? (
              coins.map((coin, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex"
                  >
                    <img
                      className="w-5 mr-2"
                      src={coin.image}
                      alt={coin.name}
                    />
                    {coin.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {"$" + coin.current_price}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {"$" + coin.market_cap}
                  </th>

                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {coin.price_change_percentage_24h > 0 ? (
                      <span className="text-green-500">
                        {Math.ceil(coin.price_change_percentage_24h * 100) /
                          100 +
                          "%"}
                      </span>
                    ) : (
                      <span className="text-red-500">
                        {Math.ceil(coin.price_change_percentage_24h * 100) /
                          100 +
                          "%"}
                      </span>
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {coin.market_cap_rank}
                  </th>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Not Found
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
