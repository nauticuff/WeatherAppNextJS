import React, { useEffect, useState } from 'react';
import { useLoadScript, Autocomplete, LoadScript } from '@react-google-maps/api';
import { getWeather } from '@/DataService/DataService';

const libraries: ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[] = ['places'];
const apiKey = process.env.API_KEY || '';

const PlacesAutocomplete: React.FC = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [coord, setCoord] = useState([0, 0])

  const handlePlaceSelect = async () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        setCoord([place.geometry.location.lat(), place.geometry.location.lng()])
        const data = await getWeather(place.geometry.location.lat(), place.geometry.location.lng(), Intl.DateTimeFormat().resolvedOptions().timeZone)
        console.log(data)
      }
    }
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <Autocomplete
        onLoad={(autoComplete) => setAutocomplete(autoComplete)}
        onPlaceChanged={() => handlePlaceSelect()}
      >
        <input type="text" placeholder="Search for a location" className='w-[220px] overflow-hidden bg-[#3c70a1] p-1 text-white placeholder:text-gray-300 rounded-3xl text-center'/>
      </Autocomplete>

    </div>
    
  );
};

const PlacesAutocompleteContainer: React.FC = () => {

  const { isLoaded: isScriptLoaded, loadError: scriptLoadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (scriptLoadError) {
    return <div>Error loading Google Maps script</div>;
  }

  if (!isScriptLoaded) {
    return <div>Loading Google Maps script</div>;
  }

  return <PlacesAutocomplete />;
};

export default PlacesAutocompleteContainer;
