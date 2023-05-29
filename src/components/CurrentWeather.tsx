import React, { useState } from "react";
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const CurrentWeather = (props: any) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-[#386894] p-3 rounded-lg text-center text-white">
      <div className="current-top">
        <p className="font-light">{props.currentWeather.current.name}</p>
        <h1 className="text-3xl">
          {props.currentWeather.current.currentTemp} &deg;F
        </h1>
        <p className="font-light">{props.currentWeather.current.description}</p>
        <p className="font-light">
          H: {props.currentWeather.current.highTemp}&deg; L:{" "}
          {props.currentWeather.current.lowTemp}&deg;
        </p>
      </div>
      <div className="flex justify-around">
        {/* <Button variant='contained' className='bg-[#23405c]'>Hello</Button> */}
        <Button
          onClick={() => setIsFavorited(!isFavorited)}
          variant="contained"
          className="w-[140px] bg-[#23405c] py-1 rounded-full text-inherit tracking-wider hover:bg-slate-200 hover:text-black"
        >
          <span className="px-1">
            {isFavorited ? "favorite" : "unfavorite"}
          </span>
          {isFavorited ? <StarBorderRoundedIcon /> : <StarRoundedIcon />}
        </Button>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="contained"
          className="bg-[#23405c] px-3 py-1 rounded-full tracking-wider hover:bg-slate-200 hover:text-black"
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
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Paris</MenuItem>
        <MenuItem onClick={handleClose}>London</MenuItem>
        <MenuItem onClick={handleClose}>Rome</MenuItem>
      </Menu>
      </div>
    </div>
  );
};

export default CurrentWeather;
