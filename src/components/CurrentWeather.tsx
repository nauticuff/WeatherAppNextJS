import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HourlyWeather from "./HourlyWeather/HourlyWeather";

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
  isFetchStarted: boolean
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ currentWeather, isFetchStarted }) => {
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
  }, [])

  return (
    <div className="my-10 text-center text-white">
      {isLoading ? (
        <div className="flex justify-center items-center flex-col">
          <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />          
          <Skeleton variant="text" width={50} sx={{ fontSize: '1.875rem'}}/>
          <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />          
          <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />          
        </div>
      ) : (
        <div>
          <p className="font-light">{currentWeather.name}</p>
          <h1 className="text-3xl">{currentWeather.currentTemp}&deg; F</h1>
          <p className="font-light">{currentWeather.icon}</p>
          <p className="font-light">
            H: {currentWeather.highTemp}&deg; L: {currentWeather.lowTemp}&deg;
          </p>
        </div>
      )}
      {/* <div className="current-top">
        <p className="font-light">{currentWeather.name}</p>
        <h1 className="text-3xl">{currentWeather.currentTemp}&deg; F</h1>
        <p className="font-light">{currentWeather.icon}</p>
        <p className="font-light">
          H: {currentWeather.highTemp}&deg; L: {currentWeather.lowTemp}&deg;
        </p>
      </div> */}
    </div>
  );
};

export default CurrentWeather;
