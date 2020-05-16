import React from 'react';

const Rank=({rank,user})=>{
    return(
        <div>
            <div className='white f3 center'>
                {/*console.log(user)*/}
                {user+', your current detections are ...'}
            </div>
            <div className='white f1 center'>
                {rank}
            </div>
        </div>
    );
}

export default Rank;