import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { City } from "@/types/cities";
import useSWR from "swr";

function Destinations(props: { goBack: () => void; choice: string | null }) {
  const { choice } = props;
  const [chunkIndex, setChunkIndex] = useState(0);
  const [matchingCities, setMatchingCities] = useState<City[]>([]);

  const { data, error, isLoading } = useSWR(
    choice ? `/api/weather-chunk?index=${chunkIndex}&choice=${choice}` : null,
    fetcher,
    {
      refreshInterval: 67000,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data?.matches?.length) {
      setMatchingCities((prev) => [...prev, ...data.matches]);
    }

    const next = chunkIndex + 1;
    const timeout = setTimeout(() => setChunkIndex(next), 67000);

    return () => clearTimeout(timeout);
  }, [data]);

  if (error) return <div>Error fetching weather</div>;

  useEffect(() => {}, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-2xl text-gray-800 dark:text-white">
        <Logo />
        <div className="flex flex-col items-center justify-center mt-16 animate-pulse transition-all duration-300 ease-in-out">
          <span className="text-6xl text-green-500 animate-bounce">
            &#9992;
          </span>
          <span className="font-semibold mt-2">Loading destinations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative w-full justify-center text-2xl text-center text-gray-800 dark:text-white pb-16">
      <div
        onClick={() => props.goBack()}
        className="flex top-5 left-5 lg:top-10 lg:left-10 hover:font-bold absolute flex-col items-center justify-center hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
      >
        <span className="text-6xl text-green-500">&#11164;</span>
        <span className="font-semibold">Go back</span>
      </div>
      <div className="mt-32 lg:mt-20">
        <Logo />
        <h2 className="text-4xl pb-12 pt-4">
          This could be your next destination
        </h2>
        <ul className="flex justify-center gap-x-28 gap-y-12 flex-wrap">
          {matchingCities.map((city, index) => (
            <li
              className="rounded-xl bg-white border-2 border-green-300/50  flex flex-col w-80 px-6 py-12 shadow-lg"
              key={city.name + index}
            >
              {city.imageUrl ? (
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              ) : (
                <div className="w-full h-40 bg-white text-gray-300 border-b-3 border-gray-300 font-bold flex items-center rounded mb-2">
                  Maybe you will be the one who takes this picture?
                </div>
              )}
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Name</span>
                <span className="text-right">{city.name}</span>
              </div>
              <div className="flex bg-white justify-between items-center mb-4">
                <span className="font-semibold">Country</span>
                <span>{city.country}</span>
              </div>
              <div className="flex bg-white justify-between items-center mb-4">
                <span className="font-semibold">Temp</span>
                <span>{city.temp}°C</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center justify-center mt-16 animate-pulse transition-all duration-300 ease-in-out">
          <span className="text-6xl text-green-500 animate-bounce">
            &#9992;
          </span>
          <span className="font-semibold mt-2">
            {matchingCities.length === 0
              ? "Loading destinations"
              : "Loading more"}
          </span>
        </div>
      </div>
    </div>
  );
}

const fetcher = (url: URL) => fetch(url).then((res) => res.json());

export default Destinations;
