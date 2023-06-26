import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ICON_MAP, getIconUrl } from "./HelperFunctions/IconMap";
import { Skeleton } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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

  const dailyCount = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="bg-[#386894] px-6 rounded-lg md:w-1/2 md:px-4">
      <div className="flex items-center gap-8 text-gray-300 font-light text-sm py-4">
        <CalendarMonthIcon />
        <p className="sm">7-Day Forecast</p>
      </div>
      <div className="text-white">
        {isLoading
          ? dailyCount.map((count) => (
              <React.Fragment key={count}>
                <hr />
                <div className="flex justify-between py-6 gap-2 font-light items-center">
                  <Skeleton width={45} />
                  <Skeleton variant="circular" width={30} height={30} />
                  <Skeleton width={65} />
                  <Skeleton width={55} />
                </div>
              </React.Fragment>
            ))
          : dailyWeather.map((day: DailyModel, index: any) => (
              <div key={day.day}>
                <hr />
                <div className="grid grid-cols-4 py-2 gap-2 font-light items-center">
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
