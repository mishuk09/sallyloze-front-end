import React from 'react';
import applepay from './img/applepay.svg';
import am from './img/am.svg';
import gpay from './img/gpay.svg';
import master from './img/master.svg';
import paypal from './img/paypal.svg';
import shopify from './img/shopify.svg';
import union from './img/union.svg';
import visa from './img/visa.svg';
import logo from '../logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (



        <div id='footer' class=' footer-section   bottom-0 w-full'>
            <div class='bg-slate-50 h-auto   w-full  '>
                <div class='custom-container footer-grid  pb-4 gap-3 w-[100%]'>
                    <div class='w-full h-full flex flex-col overflow-hidden'>
                        <p className="text-black flex justify-center items-center pt-12 pb-3 text-[15px] font-bold">
                            <img className="w-24" src={logo} alt="" />
                        </p>

                        <p class="text-justify pe-6 text-[14px]">Shop quality products, enjoy fast shipping, secure payment, and excellent service. </p>
                        <p class="text-xl sm:text-2xl font-semibold mt-3 mb-2 number">+977 65764763</p>
                        <p class="text-justify pe-6 text-[14px]">Follow us in social media as well for more update. </p>
                        <div class="flex gap-2 mt-3">
                            <p class="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><FontAwesomeIcon size='xl' icon={faFacebook} /></p>
                            <p class="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><FontAwesomeIcon size='xl' icon={faInstagram} /></p>
                            {/* <p class="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><FontAwesomeIcon size='xl' icon={faPinterest} /></p> */}
                            {/* <p class="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><FontAwesomeIcon size='xl' icon={faEnvelope} /></p>
                            <p class="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><i  size='xl' class="fa-brands fa-square-whatsapp"></i></p> */}
                        </div>
                    </div>

                    <div class='w-full footer-service h-full leading-6 flex flex-col overflow-hidden'>
                        <p class="text-black cursor-pointer pt-4 md:pt-12 pb-3 text-[15px] font-bold">About us
                        </p>
                        <a href="/privacy" class="text-[14px]   cursor-pointer pb-1">Privacy &
                            policy</a>
                        <a href="/about" class="text-[14px] cursor-pointer pb-1">About us</a>
                        <a href="/contact" class="text-[14px] cursor-pointer pb-1">Contact
                            us</a>
                        <a href="/faqs" class="text-[14px] cursor-pointer pb-1">FAQ's</a>
                        <a href="signin" class="text-[14px] cursor-pointer pb-1">My Account</a>
                    </div>

                    <div class='w-full footer-service h-full leading-6 flex flex-col overflow-hidden'>
                        <p class="text-black cursor-pointer pt-4 md:pt-12 pb-3 text-[15px] font-bold">Shop By Outletshop
                        </p>
                        <a href="/contact" class="text-[14px] cursor-pointer pb-1">Help</a>
                        <a href="/signin" class="text-[14px] cursor-pointer pb-1">Order Tracking</a>
                        <a href="/signin" class="text-[14px] cursor-pointer pb-1">Shipping & Delivery</a>
                        <a href="#" class="text-[14px] cursor-pointer pb-1">Advanced Search</a>
                        <a href="/signin" class="text-[14px] cursor-pointer pb-1">My Account</a>
                    </div>

                    <div class='grid   w-[100%]'>
                        <div class='w-full h-full flex flex-col overflow-hidden'>
                            <p
                                class="text-black   duration-200 cursor-pointer pt-4 md:pt-12 pb-3 text-[17px] font-bold">
                                Sign
                                Up to Newsletter</p>
                            <div class="grid text-sm">
                                <p class="text-[14px] cursor-pointer pb-6 text-justify">Get all the latest information
                                    on events, sales and offers. Sign up for the newsletter:</p>

                                <div class=" lg:flex gap-1">

                                    <input type="text"
                                        class="border w-full rounded-full h-10 outline-none px-4 text-gray-6    00"
                                        placeholder="Email Address" />
                                    <button
                                        class="w-full subscribe-btn   h-10 px-4 mt-4 lg:mt-0 text-white font-bold rounded-full">
                                        SUBSCRIBE
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div class="bg-slate-50 ">

                <div
                    class="custom-container bg-slate-50 mb-6 md:mb-0 md:flex text-center pt-3 flex-row  justify-between items-center w-full h-20">
                    <div class="text-[14px] py-2">© Sally Looze. 2024. All Rights Reserved</div>
                    <div class="text-[14px] py-2">Plexus.org.in Digital Marketing Services</div>

                    <div class="flex gap-3  items-center text-center justify-center">
                        <img class=" w-10" src={applepay} alt="" />
                        <img class=" w-10" src={am} alt="" />
                        <img class=" w-10" src={gpay} alt="" />
                        <img class=" w-10" src={master} alt="" />
                        <img class=" w-10" src={paypal} alt="" />
                        <img class=" w-10" src={shopify} alt="" />
                        <img class=" w-10" src={union} alt="" />
                        <img class=" w-10" src={visa} alt="" />
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Footer;