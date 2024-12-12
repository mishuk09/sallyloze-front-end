import React from 'react';
import footerlogo from '../footer-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white pt-10 d mt-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-start">
                    <img className='w-16 mb-4' src={footerlogo} alt="Logo" />
                    <p className="mb-4">Your one-stop shop for the best products. Follow us on our social media platforms to stay updated.</p>
                    <div className='flex space-x-4'>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon size='xl' icon={faFacebook} className="hover:text-blue-500 transition duration-300" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon size='xl' icon={faInstagram} className="hover:text-pink-500 transition duration-300" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon size='xl' icon={faTwitter} className="hover:text-blue-400 transition duration-300" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul>
                        <li className="mb-2"><a href="/" className="hover:underline">Home</a></li>
                        <li className="mb-2"><a href="/" className="hover:underline">New Arrivals</a></li>
                        <li className="mb-2"><a href="/" className="hover:underline">Shop</a></li>
                        <li className="mb-2"><a href="/about" className="hover:underline">About Us</a></li>
                        <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                    <ul>
                        <li className="mb-2"><a href="/faqs" className="hover:underline">FAQs</a></li>
                        <li className="mb-2"><a href="/ship" className="hover:underline">Shipping & Returns</a></li>
                        <li className="mb-2"><a href="/ordertrack" className="hover:underline">Order Tracking</a></li>
                        <li className="mb-2"><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        <li className="mb-2"><a href="/tearms " className="hover:underline">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="bg-gray-700 py-4 mt-8">
                <div className="container mx-auto px-4 text-center md:flex md:justify-between md:items-center">
                    <p className="mb-4 md:mb-0">&copy; 2024 Your Company Name. All rights reserved.</p>
                    <div>
                        <form className="flex flex-col md:flex-row md:items-center">
                            <label htmlFor="newsletter" className="mb-2 md:mb-0 md:mr-4">Subscribe to our newsletter:</label>
                            <input type="email" id="newsletter" placeholder="Enter your email" className="px-4 py-2 mb-2 md:mb-0 md:mr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button type="submit" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
