import React, { useState } from 'react'
import Image from 'next/image';
import PlacesAutocompleteContainer from './PlacesAutocomplete';

const nav = (props: any) => {

  return (
    <nav className='flex justify-between items-center'>
        <Image
            src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
            height={100}
            width={100}
            alt='partly cloudy site logo'
            className='cursor-pointer'
            onClick={() => window.location.reload()}
        >
        </Image>
        <PlacesAutocompleteContainer props={props}/>
    </nav>
  );
}

export default nav;