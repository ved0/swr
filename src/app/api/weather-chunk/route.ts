import { NextRequest, NextResponse } from "next/server";
import cities from "@/data/cities.json";
import type { City } from "@/types/cities";

const GROUP_SIZE = 20;
const GROUPS_PER_BATCH = 59;
const BATCH_SIZE = GROUP_SIZE * GROUPS_PER_BATCH;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const index = parseInt(searchParams.get("index") || "0", 10);
  const choice = searchParams.get("choice");
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const unsplashApiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  if (!choice) {
    return NextResponse.json({ matches: [] });
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OpenWeather API key" },
      { status: 500 }
    );
  }

  if (!unsplashApiKey) {
    return NextResponse.json(
      { error: "Missing Unsplash API key" },
      { status: 500 }
    );
  }

  const allCities = cities as City[];
  const start = index * BATCH_SIZE;
  const end = start + BATCH_SIZE;

  const batchCities = allCities.slice(start, end);

  if (batchCities.length === 0) {
    return NextResponse.json({
      matches: [],
    });
  }

  const cityGroups: City[][] = [];
  for (let i = 0; i < batchCities.length; i += GROUP_SIZE) {
    cityGroups.push(batchCities.slice(i, i + GROUP_SIZE));
  }

  const matches: City[] = [];

  for (const group of cityGroups) {
    const ids = group.map((c) => c.id).join(",");
    const url = `https://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data?.list?.length > 0) {
        for (const cityWeather of data.list) {
          if (
            (choice === "cold" && cityWeather.main.temp < 19) ||
            (choice === "sunny" && cityWeather.main.temp >= 19)
          ) {
            const original = group.find((c) => c.id === cityWeather.id);
            if (original) {
              matches.push({
                ...original,
                temp: cityWeather.main.temp,
                weather: cityWeather.weather?.[0]?.description,
              });
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching group: ${ids}`, error);
    }
  }

  const limitedMatches: City[] = [];
  const countryCounts: Record<string, number> = {};

  for (const city of matches) {
    const country = city.country;
    if (!countryCounts[country]) {
      countryCounts[country] = 0;
    }

    if (countryCounts[country] < 2) {
      limitedMatches.push(city);
      countryCounts[country]++;
    }
  }

  const citiesWithImages = await Promise.all(
    limitedMatches.map(async (city) => {
      try {
        const unsplashRes = await fetch(
          `https://api.unsplash.com/search/photos?query=${city.name}&client_id=${unsplashApiKey}`
        );
        const unsplashData = await unsplashRes.json();

        const imageUrl = unsplashData?.results?.[0]?.urls?.regular || "";

        return {
          ...city,
          imageUrl,
        };
      } catch (error) {
        console.error(`Error fetching image for city: ${city.name}`, error);
        return {
          ...city,
          imageUrl: "",
        };
      }
    })
  );

  return NextResponse.json({
    matches: citiesWithImages,
  });
}
