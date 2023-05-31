import React from "react";
import styles from "./hourlyweather.module.css";
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface HourlyModel {
  hour: string;
  icon: number;
  precip: number;
  temp: number;
  timestamp: number;
}

interface HourlyWeatherProps {
  hourlyWeather: HourlyModel[];
}
const HourlyWeather: React.FC<HourlyWeatherProps> = ({ hourlyWeather }) => {
  return (
    <div className="text-white font-light grid grid-flow-col overflow-x-scroll">
      {hourlyWeather.map((row: HourlyModel, index: number) => (
        <div key={row.timestamp} className="mr-3 mb-4 w-16 grid place-items-center gap-1">
          {index === 0 ? <p>Now</p> : <p>{row.hour}</p>}
          <WbSunnyIcon />
          <p>{row.temp}&deg; F</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyWeather;
