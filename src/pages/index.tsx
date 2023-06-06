import { useState } from "react";
import Nav from "@/components/nav";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyWeather from "@/components/HourlyWeather/HourlyWeather";
import DailyWeather from "@/components/DailyWeather";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/components/theme";
import { StyledEngineProvider } from "@mui/material/styles";
import CurrentButtons from "@/components/CurrentButtons";
import { parseCurrentWeather, parseHourlyWeather, parseDailyWeather } from "@/components/HelperFunctions/HelperFunctions";
import {
  getWeather,
  getLocation,
} from "@/DataService/DataService";
const geolocationApiKey = process.env.GEOLOCATION_API_KEY || "";
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

  const handlePlaceSelect = async (lat: number, lon: number) => {
    //if (autocomplete !== null) {
      console.log('Lat: ', lat)
      console.log('Lon: ', lon)
      setIsFetchStarted(true)
      // const place = autocomplete.getPlace();
      // if (place.geometry && place.geometry.location) {
        const weatherData = await getWeather(
          lat,
          lon,
          Intl.DateTimeFormat().resolvedOptions().timeZone
        );
        console.log('Weather Data: ', weatherData)

        const locationData = await getLocation(
          lat, 
          lon,
          geolocationApiKey
        );
        console.log(locationData)

        const current = parseCurrentWeather(weatherData, locationData);
        const hourly = parseHourlyWeather(weatherData);
        const daily = parseDailyWeather(weatherData);

        setCurrentWeather(current)
        setHourlyWeather(hourly);
        setDailyWeather(daily);
  };

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
              handlePlaceSelect={handlePlaceSelect}
            />
            <div className="flex flex-col gap-6">
              <div className="bg-[#386894] rounded-lg px-6">
                <CurrentWeather currentWeather={currentWeather} isFetchStarted={isFetchStarted}/>
                <CurrentButtons currentWeather={currentWeather} fetchLocation={handlePlaceSelect}/>
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
