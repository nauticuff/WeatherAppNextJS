import React, { useEffect, useState } from "react";
import { getWeatherDescription } from "./HelperFunctions/IconDescriptionMap";
import { Skeleton } from "@mui/material";
interface CurrentWeatherModel {
  currentTemp: number;
  highTemp: number;
  icon: number;
  lat: number;
  lon: number;
  lowTemp: number;
  name: string;
}

interface CurrentWeatherProps {
  currentWeather: CurrentWeatherModel;
  isFetchStarted: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  currentWeather,
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
    }, 2500); //
  }, []);

  return (
    <div className="my-10 text-white">
      {isLoading ? (
        <div className="flex justify-center items-center flex-col">
          <Skeleton variant="text" width={100} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={50} sx={{ fontSize: "1.875rem" }} />
          <Skeleton variant="text" width={100} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={100} sx={{ fontSize: "1rem" }} />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <p className="font-light">{currentWeather.name}</p>
          <h1 className="text-3xl">{currentWeather.currentTemp}&deg; F</h1>
          <p className="font-light">
            {getWeatherDescription(currentWeather.icon)}
          </p>
          <p className="font-light">
            H: {currentWeather.highTemp}&deg; L: {currentWeather.lowTemp}&deg;
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
