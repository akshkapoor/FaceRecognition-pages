import React from 'react';
import './imagelinkform.css';

const Imagelinkform=({getUrl,onButtonSubmit})=>{
    return(
        <div>
            <p className='f3 center'>
                {'This App will detect face in your picture. Fill in link to your image and click on Detect!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' 
                type='text' placeholder='URL'
                onChange={getUrl}
                ></input>
                <button
                className='w-30 center grow f4 link ph3 pv2 dib white bg-light-purple'
                onClick={onButtonSubmit}
                >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default Imagelinkform;