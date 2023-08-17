'use client'

import React from 'react'
import Link from 'next/link'
import { ConnectKitButton } from "connectkit"


const Header: React.FC = () => {
  return (
    <header className="bg-cat-crust p-4 flex items-center justify-between ">
      <div className="navbar bg-base-500">
        <div className="navbar-start">
          <img
            src="/tobi.png" // 替換成你的圖標的路徑
            alt="Icon"
            className="w-14 h-14"
          />
          <ul className="menu menu-horizontal px-1 text-xl lg:flex">
            <li><Link href={"/dashboard"}>Dashboard</Link></li>
            <li><Link href={"/bind"}>Bind</Link></li>
            <li><Link href={"/vote"}>Vote</Link></li>
          </ul>
        </div>
        <div className="navbar-end mr-5">
          <div>
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </header >
  );
};

export default Header;