import React from 'react'

import { NorXWestLogo } from '../../components/Icons/NorXwestLogo';

import "./Home.css";

export const Home = () => {
    return (
        <div className='home'>
            <h1>NOR. X WEST</h1>
            <h2>MODERN NICHE WEB DESIGN</h2>
            <div className='back-splash-logo-wrapper'>
               <NorXWestLogo />
            </div>
        </div>
    )
}
