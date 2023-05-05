import { useState, useEffect, KeyboardEvent } from 'react';
import axios from 'axios';

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number];
}

function AddressAutofill() {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);

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

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveOptionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveOptionIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    }
  }

  function handleOptionKeyDown(event: KeyboardEvent<HTMLLIElement>, index: number) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleClick(suggestions[index]);
      console.log(`Selected suggestion: ${suggestions[index].place_name}`);
    }
  }

  function handleListboxKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
    }
    const activeOption = document.getElementById(`option-${activeOptionIndex}`);
    if (event.key === 'ArrowDown') {
      setActiveOptionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
      if (activeOption?.nextSibling) {
        (activeOption.nextSibling as HTMLElement).focus();
      }
    } else if (event.key === 'ArrowUp') {
      setActiveOptionIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
      if (activeOption?.previousSibling) {
        (activeOption.previousSibling as HTMLElement).focus();
      }
    } else if (event.key === 'Enter') {
      handleClick(suggestions[activeOptionIndex]);
      
    }
  }

  

  //https://felipecweatherapp.azurewebsites.net/

  return (
    <div className='relative'>
      
      <input
        name="address"
        type="text"
        placeholder="Enter a location"
        value={address}
        onChange={handleInputChange}
        className='w-[220px] overflow-hidden bg-[#3c70a1] p-1 text-white placeholder:text-white rounded-3xl text-center '
        id="address"
        onKeyDown={handleKeyDown}
        autoComplete='off'
      />
      <ul 
        role="listbox" 
        className='absolute top-full right-0 w-[150%] z-10 bg-slate-100' 
        id="suggestions-listbox" 
        onKeyDown={handleListboxKeyDown} 
        aria-labelledby="address">
        {suggestions.map((suggestion, index) => (
          <li
            role="option"
            tabIndex={0}
            className={`overflow-hidden cursor-pointer hover:bg-slate-300 whitespace-nowrap ${index === activeOptionIndex ? 'bg-slate-300' : ''}`}
            key={suggestion.id}
            onClick={() => handleClick(suggestion)}
            onKeyDown={(event) => handleOptionKeyDown(event, index)}
            id={`option-${index}`}
            aria-selected={index === activeOptionIndex}
          >
            {suggestion.place_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddressAutofill;
