import React, { useEffect, useState } from "react";
import {
  useLoadScript,
  Autocomplete,
  LoadScript,
} from "@react-google-maps/api";
import {
  getWeather,
  getLocation,
  getRandomCoords,
  getCoords,
} from "@/DataService/DataService";
import { ObjectLiteralElement } from "typescript";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";

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

  // const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
  //   hour: "numeric",
  // });
  // const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
  //   weekday: "short",
  // });

  useEffect(() => {
    const exampleCoords = async () => {
      const timezoneIdx = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timezoneWord = timezoneIdx.slice(timezoneIdx.indexOf("/") + 1);
      const realLocation = timezoneWord.replace(/_/g, " ");
      const realCoords = await getCoords(realLocation, geolocationApiKey);
      const lat = realCoords.results[0].geometry.lat;
      const lon = realCoords.results[0].geometry.lng;
      props.props.props.handlePlaceSelect(lat, lon)
      // const weatherData = await getWeather(
      //   lat,
      //   lon,
      //   Intl.DateTimeFormat().resolvedOptions().timeZone
      // );

      // const current = parseCurrentWeather(weatherData, null, realLocation);
      // const hourly = parseHourlyWeather(weatherData);
      // const daily = parseDailyWeather(weatherData);

      // props.props.props.setCurrentWeather(current)

      // props.props.props.setHourlyWeather(hourly);

      // props.props.props.setDailyWeather(daily);
    };

    exampleCoords();
  }, []);

  // const handlePlaceSelect = async (lat: number, lon: number) => {
  //   //if (autocomplete !== null) {
  //     props.props.props.setIsFetchStarted(true)
  //     // const place = autocomplete.getPlace();
  //     // if (place.geometry && place.geometry.location) {
  //       const weatherData = await getWeather(
  //         lat,
  //         lon,
  //         Intl.DateTimeFormat().resolvedOptions().timeZone
  //       );

  //       const locationData = await getLocation(
  //         lat, 
  //         lon,
  //         geolocationApiKey
  //       );
  //       console.log(locationData)

  //       const current = parseCurrentWeather(weatherData, locationData);
  //       const hourly = parseHourlyWeather(weatherData);
  //       const daily = parseDailyWeather(weatherData);

  //       props.props.props.setCurrentWeather(current)

  //       props.props.props.setHourlyWeather(hourly);

  //       props.props.props.setDailyWeather(daily);
  // };

  // const parseCurrentWeather = (
  //   weatherData: any,
  //   geoData: any = null,
  //   initialLocation: any = null
  // ) => {
  //   const { temperature: currentTemp } = weatherData.current_weather;

  //   const {
  //     temperature_2m_max: [highTemp],
  //     temperature_2m_min: [lowTemp],
  //   } = weatherData.daily;

  //   if (geoData === null) {
  //     return {
  //       currentTemp: Math.round(currentTemp),
  //       highTemp: Math.round(highTemp),
  //       lowTemp: Math.round(lowTemp),
  //       lat: weatherData.latitude,
  //       lon: weatherData.longitude,
  //       icon: weatherData.current_weather.weathercode,
  //       name: initialLocation,
  //     };
  //   }

  //   const nearestLocation =
  //     geoData.results[0].components.city ||
  //     geoData.results[0].components.town ||
  //     geoData.results[0].components.village ||
  //     geoData.results[0].components.suburb ||
  //     geoData.results[0].components.neighbourhood ||
  //     geoData.results[0].components.district ||
  //     geoData.results[0].components.borough ||
  //     geoData.results[0].components.township ||
  //     geoData.results[0].components.hamlet ||
  //     geoData.results[0].components.county ||
  //     geoData.results[0].components.state ||
  //     geoData.results[0].components.country;

  //   return {
  //     currentTemp: Math.round(currentTemp),
  //     highTemp: Math.round(highTemp),
  //     lowTemp: Math.round(lowTemp),
  //     lat: weatherData.latitude,
  //     lon: weatherData.longitude,
  //     icon: weatherData.current_weather.weathercode,
  //     name: nearestLocation,
  //   };
  // };

  // const parseHourlyWeather = ({ daily, hourly, current_weather }: any) => {
  //   return hourly.time
  //     .map((time: number, index: number) => {
  //       return {
  //         idx: index,
  //         timestamp: time * 1000,
  //         hour: HOUR_FORMATTER.format(time * 1000),
  //         temp: Math.round(hourly.temperature_2m[index]),
  //         precip: Math.round(hourly.precipitation[index] * 100) / 100,
  //         icon: hourly.weathercode[index],
  //         sunrise: HOUR_FORMATTER.format(daily.sunrise[0] * 1000),
  //         sunset: HOUR_FORMATTER.format(daily.sunset[0] * 1000),
  //       };
  //     })
  //     .filter(
  //       ({ timestamp, idx }: any) =>
  //         timestamp >= current_weather.time * 1000 && idx <= 36
  //     );
  // };

  // const parseDailyWeather = ({ daily }: any) => {
  //   return daily.time.map((dayUnix: number, index: number) => {
  //     return {
  //       day: DAY_FORMATTER.format(dayUnix * 1000),
  //       icon: daily.weathercode[index],
  //       high: Math.round(daily.temperature_2m_max[index]),
  //       low: Math.round(daily.temperature_2m_min[index]),
  //       precip: Math.round(daily.precipitation_probability_max[index]),
  //     };
  //   });
  // };

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
    return <Skeleton variant="text" className="rounded-2xl bg-sky-800 h-12" />;
  }

  if (!isScriptLoaded) {
    return <Skeleton variant="text" className="rounded-2xl bg-sky-800 h-12" />;
  }

  return (
    <div>
      <Autocomplete
        onLoad={(autoComplete) => setAutocomplete(autoComplete)}
        onPlaceChanged={() => {
          if (autocomplete?.getPlace) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
              const lat = place.geometry.location.lat();
              const lon = place.geometry.location.lng();
              props.props.props.handlePlaceSelect(lat, lon);
            }
          }
        }}
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
    return <Skeleton variant="text" className="rounded-2xl bg-sky-800 h-12" />;
  }

  if (!isScriptLoaded) {
    return <Skeleton variant="text" className="rounded-2xl bg-sky-800 h-12" />;
  }

  return <PlacesAutocomplete props={props} />;
};

export default PlacesAutocompleteContainer;
