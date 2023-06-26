import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { ICON_MAP, getIconUrl } from "./HelperFunctions/IconMap";
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
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }
  }, [isFetchStarted]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className=" text-white font-light grid grid-flow-col overflow-x-scroll md:overflow-x-auto md:grid-flow-row md:px-2 md:h-[380px]">
      {isLoading
        ? skeletonCount.map((count) => (
            <React.Fragment key={count}>
              <hr className="hidden md:block md:w-11/12 md:mx-auto" />
              <div
                className="mr-3 mb-4 w-16 grid place-items-center gap-1 md:m-0 md:grid-flow-col md:w-full md:pt-3 md:pb-4"
              >
                <Skeleton variant="text" className="w-8 md:w-12"/>
                <Skeleton variant="circular" className="w-5 h-5 md:w-7 md:h-7"/>
                <Skeleton variant="text" className="w-8 md:w-10"/>
              </div>
            </React.Fragment>
          ))
        : hourlyWeather.map((row: HourlyModel, index: number) => (
            <React.Fragment key={row.timestamp}>
              <hr className="hidden md:block md:w-11/12 md:mx-auto" />
              <div
                className="mr-3 mb-4 w-16 grid place-items-center md:grid-cols-3 gap-1 md:grid-flow-col md:w-full md:m-0"
              >
                {index === 0 ? <p>Now</p> : <p>{row.hour}</p>}
                <Image
                  alt={`${ICON_MAP.get(row.icon)} weather icon`}
                  src={getIconUrl(row.icon)}
                  width={55}
                  height={55}
                ></Image>
                <p>{row.temp}&deg; F</p>
              </div>
            </React.Fragment>
          ))}
    </div>
  );
};

export default HourlyWeather;
