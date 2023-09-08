'use client'

import React from 'react'
import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'
import Image from 'next/image'


const Header: React.FC = () => {
  return (
    <header className='bg-cat-crust p-4 flex items-center justify-between '>
      <div className='navbar bg-base-500'>
        <div className='navbar-start'>
          <Link href={'/home'}>
            <Image
              alt='Tobi'
              src='/tobi/tobi.png'
              width={500}
              height={500}
              className='w-14 h-14'
            />
          </Link>
          <ul className='menu menu-horizontal px-1 text-xl lg:flex'>
            <li><Link href={'/home'}>Home</Link></li>
            <li><Link href={'/vote'}>Vote</Link></li>
            <li><Link href={'/market'}>Market</Link></li>
          </ul>
        </div>
        <div className='navbar-end mr-5'>
          <div>
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </header >
  );
};

export default Header;