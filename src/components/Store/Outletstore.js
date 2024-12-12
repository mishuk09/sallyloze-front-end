import React from 'react';
import ShopbySize from './ShopbySize';
import ShopourBasic from '../Home/ShopourBasics';
import ShopByCat from './ShopByCat';

const Outletstore = () => {
    return (
        <div>
            <div className='outlet-section    mb-10  flex flex-col justify-center items-center h-[400px]'>
                <div className='text-center text-[60px] text-white uppercase'>
                    up to 70% off
                </div>
                <div className='mt-6'>
                    <a href='/collection' className='h-10 w-full shop-sell-outlet   px-4 py-2 bg-gray-300 hover:bg-gray-200 duration-75  rounded-sm'>SHOP THE SELL</a>
                </div>
            </div>

            <div>
                <ShopbySize />
            </div>
            <div>
                <ShopourBasic />
            </div>
            <div>
                <ShopByCat />
            </div>
        </div>
    );
};

export default Outletstore;