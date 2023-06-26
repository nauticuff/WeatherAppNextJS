import React, { useEffect, useState } from "react";
import {
  useLoadScript,
  Autocomplete
} from "@react-google-maps/api";
import {
  getCoords
} from "@/DataService/DataService";
import Skeleton from "@mui/material/Skeleton";
import SearchIcon from "@mui/icons-material/Search"
import MyLocationIcon from '@mui/icons-material/MyLocation';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

const weatherApiKey = process.env.WEATHER_API_KEY || "";
const geolocationApiKey = process.env.GEOLOCATION_API_KEY || "";

const PlacesAutocomplete = (props: any) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {

    const exampleCoords = async () => {
      const timezoneIdx = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timezoneWord = timezoneIdx.slice(timezoneIdx.indexOf("/") + 1);
      const realLocation = timezoneWord.replace(/_/g, " ");
      const realCoords = await getCoords(realLocation, geolocationApiKey);
      const lat = realCoords.results[0].geometry.lat;
      const lon = realCoords.results[0].geometry.lng;
      props.props.props.handlePlaceSelect(lat, lon);
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
    <div className="flex items-center">
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
          name="location_query"
          type="text"
          placeholder="search..."
          className="border-none py-1 w-44 outline-none rounded-l-full ml-1 pl-4 overflow-hidden bg-[#386894] text-white placeholder:text-gray-200"
          /> 
      </Autocomplete>
        <SearchIcon className="rounded-r-full w-10 h-8 py-1" sx={{color: "#efefef", background: "#386894"}}/>
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
