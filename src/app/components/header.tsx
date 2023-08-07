'use client';

import React from 'react';
import Image from 'next/image';
import logo from './images/LOGO-EN.3c081f61.svg';


export function Header(){
  return (
    <header className="bg-neutral-50 border-b border-gray-200 py-4 left-">
      <div className="container mx-auto px-4 flex items-center">
        <Image className="h-12 w-auto float-left" src={logo} alt="logo" />
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 pt-6">
          Status
        </h1>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 pt-2">
          .
        </h1>
        <div className="ml-auto">
          <a
            href="https://www.tamkeentech.sa/en"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" 
          >
            Login
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;