import { useState, useEffect } from 'react';
import axios from 'axios';

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number];
}

function AddressAutofill() {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`,
          {
            params: {
              access_token: 'pk.eyJ1IjoibmF1dGljdWZmIiwiYSI6ImNsZ3psdm9heDBrdzMzZnMycmRtZmNocjkifQ.z0yh-k8Jm3VU-SSppcmoww',
              autocomplete: true,
            },
          }
        );
        setSuggestions(response.data.features);
      } catch (error) {
        console.error(error);
      }
    };

    if (address.length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [address]);

  const handleClick = (suggestion: MapboxFeature) => {
    console.log(`Latitude: ${suggestion.center[1]}, Longitude: ${suggestion.center[0]}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  //https://felipecweatherapp.azurewebsites.net/

  return (
    <div>
      <input
        name="address"
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={handleInputChange}
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} onClick={() => handleClick(suggestion)}>{suggestion.place_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AddressAutofill;
