/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import dynamic from "next/dynamic";
const CoinChart = dynamic(() => import("@/components/CoinChart"), {
  ssr: false,
});

const headerOptions = {
  headers: {
    "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGEEKO_API_KEY,
    accept: "application/json",
  },
};

const fetchCoins = async (page = 1, perPage = 10) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&locale=en`,
      headerOptions
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchCoinChartData = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`,
      headerOptions
    );
    const data = await res.json();
    const formattedData = data.prices.map(([time, value]) => ({
      time: Math.floor(time / 1000),
      value,
    }));
    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Home({ searchParams }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const perPage = 10; // Number of items per page
  const fetchedCoins = await fetchCoins(page, perPage);

  const coins = await Promise.all(
    fetchedCoins.map(async (coin) => {
      const chartData = await fetchCoinChartData(coin.id);
      return { ...coin, chartData };
    })
  );

  return (
    <main className="flex flex-col items-center justify-between p-5">
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
                <div className="flex items-center">Market cap</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">24h</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Rank</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Chart</div>
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
                    {(page - 1) * perPage + index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link
                      href={`/coins/${coin.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex"
                    >
                      <img
                        className="w-5 mr-2"
                        src={coin.image}
                        alt={coin.name}
                      />
                      {coin.name}
                    </Link>
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
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <CoinChart data={coin.chartData} />
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
      <div className="flex mt-4">
        <Link href={`/?page=${page - 1}`} passHref>
          <button
            disabled={page === 1}
            className="px-4 py-1 m-1 text-white bg-blue-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
        </Link>
        <Link href={`/?page=${page + 1}`} passHref>
          <button className="px-4 py-1 m-1 text-white bg-blue-700 rounded">
            Next
          </button>
        </Link>
      </div>
    </main>
  );
}
