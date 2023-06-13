import React, { Suspense, useState } from "react";
import Image from "next/image";
import PlacesAutocompleteContainer from "./PlacesAutocomplete";
import Skeleton from "@mui/material/Skeleton";

const Nav = (props: any) => {
  return (
    <nav className="flex mb-6 justify-between items-center">
      <Suspense
        fallback={<Skeleton variant="circular" width={40} height={40} />}
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
          height={50}
          width={50}
          alt="partly cloudy site logo"
          className="cursor-pointer"
          onClick={() => window.location.reload()}
          priority={true}
        ></Image>
      </Suspense>
      <PlacesAutocompleteContainer props={props} />
    </nav>
  );
};

export default Nav;
