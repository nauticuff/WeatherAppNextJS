import React, { useEffect, useState } from "react";
import Image from "next/image";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Skeleton } from "@mui/material";
import { ICON_MAP, getIconUrl } from "./HelperFunctions/IconMap";
interface DailyModel {
  day: string;
  icon: number;
  high: number;
  low: number;
  precip: number;
}

interface DailyWeatherProps {
  dailyWeather: DailyModel[];
  isFetchStarted: boolean;
}

const DailyWeather: React.FC<DailyWeatherProps> = ({
  dailyWeather,
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
    }, 3000); // Simulating a 2-second delay
  }, []);

  const dailyCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="bg-[#386894] px-6 rounded-lg">
      <div className="flex items-center gap-8 text-gray-300 font-light text-sm py-4">
        <p>ICON</p>
        <p className="sm">5-Day Forecast</p>
      </div>
      <div className="text-white">
        {isLoading
          ? dailyCount.map((count) => (
              <React.Fragment key={count}>
                <hr />
                <div className="flex justify-between py-4 gap-2 font-light items-center">
                  <Skeleton width={40} />
                  <Skeleton variant="circular" width={30} height={30} />
                  <Skeleton width={60} />
                  <Skeleton width={50} />
                </div>
              </React.Fragment>
            ))
          : dailyWeather.map((day: DailyModel, index: any) => (
              <div key={day.day}>
                <hr />
                <div className="grid grid-cols-4 py-4 gap-2 font-light items-center">
                  <p>{index === 0 ? "Today" : day.day}</p>
                  <div className="flex justify-center">
                    <Image
                      alt={`${ICON_MAP.get(day.icon)} weather icon`}
                      src={getIconUrl(day.icon)}
                      width={65}
                      height={65}
                    ></Image>
                  </div>
                  <p className="text-sm text-center">
                    <span className="text-lg font-normal">{day.high}&deg;</span>
                    /<span>{day.low}&deg;</span>
                  </p>
                  <div className="flex items-center justify-end">
                    <p className="mr-2">{day.precip}%</p>
                    <WaterDropIcon />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DailyWeather;
