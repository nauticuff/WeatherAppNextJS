import React, { useState } from 'react';
import { useLoadScript, Autocomplete, LoadScript } from '@react-google-maps/api';

const libraries: ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[] = ['places'];

const PlacesAutocomplete: React.FC = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setSelectedPlace(place);
    }
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBn5hnW-WXHVod-eN5NdywgAmij1U426B8',
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
        //onPlaceChanged={handlePlaceSelect}
      >
        <input type="text" placeholder="Search for a location" className='w-[220px] overflow-hidden bg-[#3c70a1] p-1 text-white placeholder:text-gray-300 rounded-3xl text-center'/>
      </Autocomplete>

    </div>
    
  );
};

const PlacesAutocompleteContainer: React.FC = () => {
  const { isLoaded: isScriptLoaded, loadError: scriptLoadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBn5hnW-WXHVod-eN5NdywgAmij1U426B8',
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
