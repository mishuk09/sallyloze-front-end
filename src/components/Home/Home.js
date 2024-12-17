import React from 'react';
import home from '../img/home/home.webp';
import Newarrival from './Newarrival';
import Offsection from './Offsection';
import Offerdiv from './Offerdiv';
import ShopourBasic from './ShopourBasics';
import Flashsell from './Flashsell';

const Home = () => {
    return (
        <div className=''>
            <div className="relative flex items-center justify-center text-center">
                <img
                    src={home}
                    alt="Banner"
                    className="w-full h-auto object-cover"
                />
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black opacity-40"></div>

                {/* Text content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white p-4 max-w-[600px] w-full">
                        <h1 className="  home-title font-lato font-light text-[20px] lg:text-[2.7rem]">THE LIGHTEST FABRIC YOU WILL EVER WEAR</h1>
                        {/* <a href='/collection' className=" btn bg-white text-black   ">
                            SHOP NOW
                        </a> */}
                        <a
                            href="/collection"
                            className="relative text-xs lg:text-base inline-flex items-center justify-center max-w-full min-h-0 lg:min-h-[1.8rem] mt-4 px-4 lg:px-[1.8rem] py-2 lg:py-[0.7rem] overflow-hidden text-center border border-transparent rounded cursor-pointer bg-white text-black text-[var(--gsc-button-font-size)] leading-[var(--gsc-button-line-height)] font-[var(--gsc-button-font-weight)]"
                        >
                            SHOP NOW
                        </a>

                    </div>
                </div>
            </div>




            <Newarrival />
            < Flashsell />
            <Offsection />
            <Offerdiv />
            <ShopourBasic />
        </div>
    );
};

export default Home;
