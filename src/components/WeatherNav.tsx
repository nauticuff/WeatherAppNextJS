import React, { useEffect, useState } from "react";
import Image from "next/image";
import PlacesAutocompleteContainer from "./PlacesAutocomplete";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const WeatherNav = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [failOpen, setFailOpen] = React.useState(false);
  const [message, setMessage] = useState("Snackbar here");

  const handleSuccessSnack = () => {
    setOpen(true);
  };

  const handleFailSnack = () => {
    setFailOpen(true);
  };

  const handleSuccessClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleFailClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setFailOpen(false);
  };

  const positionSuccess = (position: any) => {
    try {
      //setHavePermission(true);

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      props.handlePlaceSelect(lat, lon);
      setMessage("Successfully obtained weather information");
      handleSuccessSnack();
    } catch (error) {
      console.error(error);
      setMessage("Failed to obtain data. Try again.");
      handleFailSnack();
    }
  };

  const positionError = () => {
    setMessage("Please enable location to get weather forecast.");
    handleFailSnack();
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
      <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal:'right' }}
        open={failOpen}
        autoHideDuration={2500}
        onClose={handleFailClose}
      >
        <Alert
          onClose={handleFailClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please enable location to get weather forecast.
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal:'right' }}
        open={open}
        autoHideDuration={2500}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully obtained weather data!
        </Alert>
      </Snackbar>
    </>
  );
};

export default WeatherNav;
