import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import logo from './logo.png'

const Logo=()=>{
    return(
            <div>
                <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                <div className="Tilt-inner pa3 tc">
                <img alt='brain' src={logo}></img>
                </div>
                </div>
                </Tilt>
            </div>
    );
}

export default Logo;