import React, { useEffect, useState } from 'react';
import { useLoadScript, Autocomplete, LoadScript } from '@react-google-maps/api';
import { getWeather } from '@/DataService/DataService';
import { ObjectLiteralElement } from 'typescript';

const libraries: ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[] = ['places'];
const weatherApiKey = process.env.WEATHER_API_KEY || '';
const geolocationApiKey = process.env.GEOLOCATION_API_KEY || '';

interface CurrentModel {
  currentTemp: number,
  highTemp: number,
  lowTemp: number
}

interface ForecastModel {
  day: string[],
  high: number[],
  low: number[]
}

const PlacesAutocomplete = (props: any) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [coord, setCoord] = useState([0, 0]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

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

        const current = parseCurrentWeather(data)
        const forecast = parseForecastWeather(data)

        props.props.props.setCurrentWeather((prev: any) => ({
          ...prev,
          current
        }))

        // props.props.props.setForecastWeather((prev: any) => ({
        //   ...prev,
        //   forecast
        // }))
      }
    }
  };


  const parseCurrentWeather = ({ current_weather, daily }: any) => {
    const {
      temperature: currentTemp
    } = current_weather

    const {
      temperature_2m_max: [highTemp],
      temperature_2m_min: [lowTemp]
    } = daily

    return {
      currentTemp,
      highTemp,
      lowTemp
    }
  }

  const parseForecastWeather = ({ daily }: any) => {
    const {
      time: day,
      temperature_2m_max: high,
      temperature_2m_min: low,
    } = daily

    return {
      day,
      high,
      low
    }
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
    return <div>Error loading maps</div>;
  }

  if (!isScriptLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <Autocomplete
        onLoad={(autoComplete) => setAutocomplete(autoComplete)}
        onPlaceChanged={handlePlaceSelect}
      >
        <input
          type="text"
          placeholder="Search for a location"
          className="border-none w-[220px] focus:outline-dashed rounded-3xl px-3 text-center overflow-hidden bg-[#3c70a1] p-1 text-white placeholder:text-gray-300"
        />
      </Autocomplete>
    </div>
  );
};

const PlacesAutocompleteContainer = (props: any) => {
  const { isLoaded: isScriptLoaded, loadError: scriptLoadError } = useLoadScript({
    googleMapsApiKey: weatherApiKey,
    libraries,
  });

  if (scriptLoadError) {
    return <div>Error loading Google Maps script</div>;
  }

  if (!isScriptLoaded) {
    return <div>Loading Google Maps script</div>;
  }

  return <PlacesAutocomplete props={props} />;
};

export default PlacesAutocompleteContainer;
