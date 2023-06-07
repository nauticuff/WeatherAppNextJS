import React, { useEffect, useState } from "react";
import styles from "./hourlyweather.module.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Skeleton } from "@mui/material";
import { ICON_MAP } from "../HelperFunctions/IconMap";
import Image from "next/image";
interface HourlyModel {
  hour: string;
  icon: number;
  precip: number;
  temp: number;
  timestamp: number;
}

interface HourlyWeatherProps {
  hourlyWeather: HourlyModel[];
  isFetchStarted: boolean;
}
const HourlyWeather: React.FC<HourlyWeatherProps> = ({
  hourlyWeather,
  isFetchStarted,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFetchStarted) {
      setIsLoading(true); // Set isLoading to true when isFetchStarted changes
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulating a 2-second delay
    }
  }, [isFetchStarted]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);

  const skeletonCount = [1, 2, 3, 4, 5, 6];

  const getIconUrl = (iconCode: number) => {
    return `@public/${ICON_MAP.get(iconCode)}.svg`
  }
  return (
    <div className="text-white font-light grid grid-flow-col overflow-x-scroll">
      {isLoading ? (
          skeletonCount.map((count) => (
            <div key={count} className="mr-3 mb-4 w-16 grid place-items-center gap-1">
              <Skeleton variant="text" width={30} />
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={30} />
            </div>
          ))
      ) : (
        hourlyWeather.map((row: HourlyModel, index: number) => (
          <div
            key={row.timestamp}
            className="mr-3 mb-4 w-16 grid place-items-center gap-1"
          >
            {index === 0 ? <p>Now</p> : <p>{row.hour}</p>}
            <Image alt="weather icon" src={`public/${ICON_MAP.get(row.icon)}.svg`} width={30} height={30}></Image>
            <p>{row.temp}&deg; F</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HourlyWeather;
