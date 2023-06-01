import React, { useState } from "react";
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HourlyWeather from "./HourlyWeather/HourlyWeather";

const CurrentWeather = (props: any) => {
  // const [isFavorited, setIsFavorited] = useState(false);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  console.log(props.currentWeather)

  return (
    <div className="my-10 text-center text-white">
      <div className="current-top">
        <p className="font-light">{props.currentWeather.current.name}</p>
        <h1 className="text-3xl">
          {props.currentWeather.current.currentTemp}&deg; F
        </h1>
        <p className="font-light">{props.currentWeather.current.description}</p>
        <p className="font-light">
          H: {props.currentWeather.current.highTemp}&deg; L:{" "}
          {props.currentWeather.current.lowTemp}&deg;
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
