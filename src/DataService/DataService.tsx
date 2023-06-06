// const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}`

//const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

interface PlaceModel {
    name: string;
    lat: number;
    lon: number
}

const getWeather = async (lat: number, lon: number, timezone: string) => {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}`);
    const data = await res.json();
    return data
}

const getLocation = async (lat: number, lon: number, apiKey: string) => {
    const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${lat},${lon}&no_annotations=1&components=city,town,village`)
    const data = await res.json();
    return data
}

const getCoords = async (location: string, apiKey: string) => {
    const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`);
    const data = await res.json()
    return data
}

const getRandomCoords = async () => {
    try {
        const res = await fetch('https://api.3geonames.org/?randomland=yes&json=1')
        const data = await res.json();
        return data
    }
    catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching random coordinates:', error);
        throw error; // Optional: Throw the error to be caught by the caller
    }
}

const getFavoritedLocations = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localStorageData = localStorage.getItem('FavoritedLocations');
      return localStorageData ? JSON.parse(localStorageData) : [];
    } else {
      return [];
    }
  };
  
  const saveLocation = (name: string, lat: number, lon: number) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const locations: PlaceModel[] = getFavoritedLocations();
      for(let i = 0; i < locations.length; i ++){
        if(name === locations[i].name){
          return
        }
      }
      locations.push({
        name,
        lat,
        lon,
      });
      localStorage.setItem('FavoritedLocations', JSON.stringify(locations));
    }
  };
  
  const deleteLocation = (name: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const locations = getFavoritedLocations();
      const index = locations.findIndex((place: PlaceModel) => place.name === name);
  
      if (index !== -1) {
        locations.splice(index, 1);
        localStorage.setItem('FavoritedLocations', JSON.stringify(locations));
      }
    }
  };
  

export { getWeather, getLocation, getRandomCoords, getCoords, getFavoritedLocations, saveLocation, deleteLocation }

