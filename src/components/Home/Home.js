import React from 'react';
import home from '../img/home/home.webp';
import Newarrival from './Newarrival';
import Offsection from './Offsection';
import Offerdiv from './Offerdiv';
import ShopourBasic from './ShopourBasics';
import Flashsell from './Flashsell';
import { Link } from 'react-router-dom';

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
                        <h1 className="  home-title font-lato">THE LIGHTEST FABRIC YOU WILL EVER WEAR</h1>
                        <a href='collection' className=" btn bg-white text-black   ">
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
