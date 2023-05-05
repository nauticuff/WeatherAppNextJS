import React from 'react'
import Image from 'next/image';
import AddressAutofill from '@/pages/autofill';

const nav = () => {
  return (
    <nav className='flex justify-between items-center'>
        <Image
            src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
            height={100}
            width={100}
            alt='partly cloudy site logo'
        >
        </Image>
        <AddressAutofill />
    </nav>
  );
}

export default nav;