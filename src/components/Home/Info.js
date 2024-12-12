import React from 'react';
import map from '../img/home/05_Australian_Made.svg';
import trans from '../img/home/08_Integrity.svg';

const Info = () => {
    return (
        <div className='container mt-10 mb-14 flex justify-around'>
            <div><img className='w-20 h-20' src={map} alt="" />
                <p className='text-gray-500'>Australian Made</p></div>
            <div><img className='w-20 h-20' src={trans} alt="" />
                <p className='text-gray-500'>Transparency</p></div>

        </div>
    );
};

export default Info;