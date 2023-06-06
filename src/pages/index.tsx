import { useState } from "react";
import Nav from "@/components/nav";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyWeather from "@/components/HourlyWeather/HourlyWeather";
import DailyWeather from "@/components/DailyWeather";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/theme";
import { StyledEngineProvider } from "@mui/material/styles";
import CurrentButtons from "@/components/CurrentButtons";

interface CurrentModel {
  currentTemp: number,
  highTemp: number,
  icon: number,
  lat: number,
  lon: number,
  lowTemp: number,
  name: string,
}

interface HourlyModel {
  hour: string,
  icon: number,
  precip: number,
  temp: number,
  timestamp: number
}

interface DailyModel {
  day: string,
  icon: number,
  high: number,
  low: number,
  precip: number
}

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<CurrentModel>({
    currentTemp: 0,
    highTemp: 0,
    icon: 0,
    lat: 0,
    lon: 0,
    lowTemp: 0,
    name: '',
  });
  const [hourlyWeather, setHourlyWeather] = useState<HourlyModel[]>([]);
  const [dailyWeather, setDailyWeather] = useState<DailyModel[]>([]);
  const [isFetchStarted, setIsFetchStarted] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider>
        <div className="h-screen bg-[linear-gradient(#2c97df,#a2b3c4)] py-8 px-6 overflow-y-scroll">
          <div className="max-w-6xl mx-auto">
            <Nav
              setCurrentWeather={setCurrentWeather}
              setHourlyWeather={setHourlyWeather}
              setDailyWeather={setDailyWeather}
              setIsFetchStarted={setIsFetchStarted}
            />
            <div className="flex flex-col gap-6">
              <div className="bg-[#386894] rounded-lg px-6">
                <CurrentWeather currentWeather={currentWeather} isFetchStarted={isFetchStarted}/>
                <CurrentButtons />
                <hr className="mx-auto my-4 w-[96%]"/>
                <HourlyWeather hourlyWeather={hourlyWeather} isFetchStarted={isFetchStarted}/>
              </div>
              <DailyWeather dailyWeather={dailyWeather} isFetchStarted={isFetchStarted}/>
            </div>
          </div>
        </div>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
