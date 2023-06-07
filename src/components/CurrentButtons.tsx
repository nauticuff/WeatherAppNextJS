import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  getFavoritedLocations,
  saveLocation,
  deleteLocation,
} from "@/DataService/DataService";
import { json } from "stream/consumers";
interface CurrentWeatherModel {
  currentTemp: number;
  highTemp: number;
  icon: number;
  lat: number;
  lon: number;
  lowTemp: number;
  name: string;
}

interface PlaceModel {
  name: string;
  lat: number;
  lon: number;
}
interface CurrentButtonsProps {
  currentWeather: CurrentWeatherModel;
  fetchLocation: (lat: number, lon: number) => void;
}
const CurrentButtons: React.FC<CurrentButtonsProps> = ({
  currentWeather,
  fetchLocation,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFavoritedSelection = (lat: number, lon: number) => {
    fetchLocation(lat, lon);
  };

  const handleFavoriteButton = () => {
    if (!isFavorited) {
      saveLocation(currentWeather.name, currentWeather.lat, currentWeather.lon);
      setIsFavorited(!isFavorited);
    } else {
      deleteLocation(currentWeather.name);
      setIsFavorited(!isFavorited);
    }
  };

  const FavoritedLocations: PlaceModel[] = getFavoritedLocations();

  useEffect(() => {
    const isLocationFavorited = FavoritedLocations.some(
      (place) => place.name === currentWeather.name
    );
    setIsFavorited(isLocationFavorited);
  }, [currentWeather.name, FavoritedLocations]);

  return (
    <div className="flex justify-center flex-wrap gap-4 col text-white sm:justify-around md:mb-4">
      <Button
        onClick={handleFavoriteButton}
        variant="contained"
        className="w-[170px] bg-[#23405c] rounded-full text-inherit tracking-wider hover:bg-slate-200 hover:text-black"
      >
        <span className="px-1">{isFavorited ? "unfavorite" : "favorite"}</span>
        {isFavorited ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
      </Button>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        className="bg-[#23405c] rounded-full tracking-wider hover:bg-slate-200 hover:text-black"
      >
        <span className="px-2">Favorite List</span>
        <BookmarksOutlinedIcon fontSize="small" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {FavoritedLocations.length === 0 ? "Favorites will appear here" : ""}
        {FavoritedLocations.map((place: PlaceModel) => (
          <MenuItem
            key={place.name}
            onClick={() => {
              handleFavoritedSelection(place.lat, place.lon);
              handleClose;
            }}
          >
            {place.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CurrentButtons;
