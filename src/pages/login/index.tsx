'use client'

import React, { useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='h-screen firewatch-bg bg-center p-6 flex justify-center items-center'>
            <div className='px-4 py-12 h-fit bg-black/80 rounded-lg text-white text-2xl sm:w-[450px] sm:px-8 md:w-[600px] md:px-10 md:py-14'>
                <h1 className="text-3xl font-semibold mb-8">Login</h1>
                <div className="form-group mb-2">
                    <label className='text-sm' htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Username" className="text-sm form-control w-full bg-transparent rounded-md outline-none px-2 py-2 border border-white/50" autoComplete='off' />
                </div>
                <div className="form-group mb-1">
                    <label className='text-sm' htmlFor="password">Password</label>
                    <div className="relative flex items-center">
                        <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" className="text-sm form-control w-full bg-transparent rounded-md outline-none px-2 py-2 border border-white/50" autoComplete='off' />
                        <button className="absolute right-2" onClick={togglePasswordVisibility}>
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                        </button>
                    </div>
                </div>
                <p className='underline text-white/50 text-xs text-end mb-10'>Forgot password</p>
                <Link href='/' className='bg-blue-600 text-white text-base text-center rounded-md w-full block py-1'>Login</Link>
            </div>
        </div>
    );
}
