import Image from "next/image";
import PlacesAutocompleteContainer from "./PlacesAutocomplete";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import toast, { Toaster } from 'react-hot-toast'
import Link from "next/link";

const WeatherNav = (props: any) => {

  const positionSuccess = (position: any) => {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      props.handlePlaceSelect(lat, lon);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Try again.')
    } finally {
      toast.success('Successfully obtained weather information')
    }
  };

  const positionError = () => {
    toast.error('Please enable location to get weather forecast.')
  };

  const handleCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    }
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
      <div className="flex justify-end items-center space-x-4">
        <Link href='/login' className="bg-[#386894] hover:bg-[#264969] transition-all px-2 py-1 rounded-md text-white">Login</Link>
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
