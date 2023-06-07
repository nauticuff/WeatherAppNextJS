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

  useEffect(() => {
    const exampleCoords = async () => {
      const timezoneIdx = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timezoneWord = timezoneIdx.slice(timezoneIdx.indexOf("/") + 1);
      const realLocation = timezoneWord.replace(/_/g, " ");
      const realCoords = await getCoords(realLocation, geolocationApiKey);
      const lat = realCoords.results[0].geometry.lat;
      const lon = realCoords.results[0].geometry.lng;
      props.props.props.handlePlaceSelect(lat, lon)
    };

    exampleCoords();
  }, []);

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
