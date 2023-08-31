import Image from "next/image";
import PlacesAutocompleteContainer from "./PlacesAutocomplete";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import toast, { Toaster } from 'react-hot-toast'

const WeatherNav = (props: any) => {

  const positionSuccess = (position: any) => {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      props.handlePlaceSelect(lat, lon);
      console.log('This is try')
    } catch (error) {
      console.error(error);
      console.log('This is error')
      toast.error('Something went wrong. Try again.')
    } finally {
      toast.success('Successfully obtained weather information')
    }
  };

  const positionError = (error: any) => {
    if (error.code === error.PERMISSION_DENIED) {
      toast.error('Location permission was revoked. Please enable location to get weather forecast.');
    } else {
      console.error('Geolocation error:', error);
      toast.error('An error occurred while obtaining location.');
    }
  };
   
  let positionWatcher: any;

  const handleCurrentPosition = () => {
    if (positionWatcher) {
      navigator.geolocation.clearWatch(positionWatcher); // Clear previous watcher if exists
    }
  
    positionWatcher = navigator.geolocation.watchPosition(positionSuccess, positionError);
  };

  return (
    <>
      <nav className="flex justify-between items-center">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
          height={50}
          width={50}
          alt="partly cloudy site logo"
          className="cursor-pointer"
          onClick={() => window.location.reload()}
          priority={true}
        ></Image>
        <PlacesAutocompleteContainer props={props} />
      </nav>
      <div className="flex justify-end">
        <Tooltip title="Get weather info">
          <IconButton onClick={handleCurrentPosition}>
            <MyLocationIcon
              sx={{ cursor: "pointer", color: "#fff" }}
              name="get current location weather information"
              aria-label="my location icon"
            />
          </IconButton>
        </Tooltip>
      </div>
      <Toaster />
    </>
  );
};

export default WeatherNav;
