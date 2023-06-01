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
  const [currentWeather, setCurrentWeather] = useState({
    current: {
      description: "Sunny",
      icon: "04d",
      currentTemp: 75,
      highTemp: 90,
      lowTemp: 55,
      name: "Stockton",
      sunsetTime: 1679537879,
      lat: 10,
      lon: 20,
    },
  });

  const [hourlyWeather, setHourlyWeather] = useState<HourlyModel[]>([])

  // const [dailyWeather, setDailyWeather] = useState(
  //   [
  //     { day: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  //     { icon: [65, 62, 70, 59, 60, 63] },
  //     { high: [65, 62, 70, 59, 60, 63] },
  //     { low: [57, 55, 45, 49, 50, 52] },
  //     {
  //       sunrise: ["Sunny", "Overcast", "Cloudy", "Rainy", "Sunny", "Snow"],
  //     },
  //     { sunset: ["Sunny", "Overcast", "Cloudy", "Rainy", "Sunny", "Snow"] },
  //   ]
  // );

  const [dailyWeather, setDailyWeather] = useState<DailyModel[]>([])

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider>
        <div className="h-screen bg-[linear-gradient(#2c97df,#a2b3c4)] py-8 px-6 overflow-y-scroll">
          <div className="max-w-6xl mx-auto">
            <Nav
              setCurrentWeather={setCurrentWeather}
              setHourlyWeather={setHourlyWeather}
              setDailyWeather={setDailyWeather}
            />
            <div className="flex flex-col gap-6">
              <div className="bg-[#386894] rounded-lg px-6">
                <CurrentWeather currentWeather={currentWeather} />
                <CurrentButtons />
                <hr className="mx-auto my-4 w-[96%]"/>
                <HourlyWeather hourlyWeather={hourlyWeather}/>
              </div>
              <DailyWeather dailyWeather={dailyWeather} />
            </div>
          </div>
        </div>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
