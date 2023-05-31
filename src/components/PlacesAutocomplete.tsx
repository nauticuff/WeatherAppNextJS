import React, { useEffect, useState } from "react";
import {
  useLoadScript,
  Autocomplete,
  LoadScript,
} from "@react-google-maps/api";
import { getWeather } from "@/DataService/DataService";
import { ObjectLiteralElement } from "typescript";
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];
const weatherApiKey = process.env.WEATHER_API_KEY || "";
const geolocationApiKey = process.env.GEOLOCATION_API_KEY || "";

interface CurrentModel {
  currentTemp: number;
  highTemp: number;
  lowTemp: number;
}

interface ForecastModel {
  day: string[];
  high: number[];
  low: number[];
}

const PlacesAutocomplete = (props: any) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [coord, setCoord] = useState([0, 0]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
  });
  const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
  });

  const handlePlaceSelect = async () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        //setCoord([place.geometry.location.lat(), place.geometry.location.lng()]);
        const data = await getWeather(
          place.geometry.location.lat(),
          place.geometry.location.lng(),
          Intl.DateTimeFormat().resolvedOptions().timeZone
        );

        const current = parseCurrentWeather(data);
        const hourly = parseHourlyWeather(data);
        const daily = parseDailyWeather(data);
        //console.log(current)
        //console.log(hourly);
        console.log(daily);

        props.props.props.setCurrentWeather((prev: any) => ({
          ...prev,
          current,
        }));

        props.props.props.setHourlyWeather(hourly);

        //props.props.props.setDailyWeather(daily)
        //console.log(data)
      }
    }
  };

  const parseCurrentWeather = ({ current_weather, daily }: any) => {
    const { temperature: currentTemp } = current_weather;

    const {
      temperature_2m_max: [highTemp],
      temperature_2m_min: [lowTemp],
    } = daily;

    return {
      currentTemp: Math.round(currentTemp),
      highTemp: Math.round(highTemp),
      lowTemp: Math.round(lowTemp),
    };
  };

  const parseHourlyWeather = ({ hourly, current_weather }: any) => {
    return hourly.time.map((time: number, index: number) => {
      return {
        idx: index,
        timestamp: time * 1000,
        hour: HOUR_FORMATTER.format(time * 1000),
        temp: Math.round(hourly.temperature_2m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
        icon: hourly.weathercode[index]
      }
    }).filter(({ timestamp, idx }: any) => timestamp >= current_weather.time * 1000 && idx <= 36)
  };

  const parseDailyWeather = ({ daily }: any) => {
    return daily.time.map((dayUnix: number, index: number) => {
      return {
        day: DAY_FORMATTER.format(dayUnix * 1000),
        icon: daily.weathercode[index],
        high: Math.round(daily.temperature_2m_max[index]),
        low: Math.round(daily.temperature_2m_min[index]),
        sunrise: HOUR_FORMATTER.format(daily.sunrise[index] * 1000),
        sunset: HOUR_FORMATTER.format(daily.sunset[index] * 1000)
      } 
    })
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: weatherApiKey,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      setIsScriptLoaded(true);
    }
  }, [isLoaded]);

  if (loadError) {
    return <Skeleton variant="text" className="rounded-2xl bg-sky-800 h-12" />
  }

  if (!isScriptLoaded) {
    return <Skeleton variant="text" className="rounded-2xl bg-sky-800 h-12" />
  }

  return (
    <div>
      <Autocomplete
        onLoad={(autoComplete) => setAutocomplete(autoComplete)}
        onPlaceChanged={handlePlaceSelect}
      >
        <input
          type="text"
          placeholder="enter location"
          className="border-none w-44 focus:outline-dashed rounded-full px-3 text-center overflow-hidden bg-[#3c70a1] p-1 text-white placeholder:text-gray-300"
        />
      </Autocomplete>
    </div>
  );
};

const PlacesAutocompleteContainer = (props: any) => {
  const { isLoaded: isScriptLoaded, loadError: scriptLoadError } =
    useLoadScript({
      googleMapsApiKey: weatherApiKey,
      libraries,
    });

  if (scriptLoadError) {
    return <Skeleton variant="text" className="rounded-2xl bg-sky-800 h-12" />
  }

  if (!isScriptLoaded) {
    return <Skeleton variant="text" className="rounded-2xl bg-sky-800 h-12" />
  }

  return <PlacesAutocomplete props={props} />;
};

export default PlacesAutocompleteContainer;
