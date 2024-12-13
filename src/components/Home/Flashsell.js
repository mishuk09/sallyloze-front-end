import * as axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Flashsell = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://sneakers-backend-1.onrender.com/posts')
            .then(response => {
                setPosts(response.data.slice(0, 12));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    const calculateTimeLeft = () => {
        const targetDate = new Date('2024-12-31T23:59:59'); // Set the target date and time for the flash sell
        const difference = targetDate - new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer); // Clean up the interval on component unmount
    }, []);



    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem('wishlist')) || {}
    );

    const handleWishlist = (productId) => {
        const updatedWishlist = { ...wishlist, [productId]: !wishlist[productId] };
        setWishlist(updatedWishlist);

        // Update localStorage with the new wishlist state
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    useEffect(() => {
        // Sync state with localStorage on component mount
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (savedWishlist) {
            setWishlist(savedWishlist);
        }
    }, []);
    return (
        <div className='offer-div mt-10 pb-6'>
            <div className="flex container mx-auto justify-between items-center pt-10 px-1">
                <h1 className="italic ">Flash Sell</h1>
                <div className="flex space-x-2 items-center">
                    <p>Hurry up! Offer ends in:</p>

                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-semibold flash-sell text-gray-200">{timeLeft.hours || 0}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-semibold flash-sell text-gray-200">{timeLeft.minutes || 0}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-semibold flash-sell text-gray-200">{timeLeft.seconds || 0}</span>
                    </div>
                </div>
            </div>
            <Carousel
                responsive={responsive}
                infinite={false}
                autoPlay={false}
                itemClass="px-2"
                containerClass="container mt-6 mx-auto px-4"
            >
                {posts.map(product => (
                    <div key={product._id} className="relative bg-white rounded-sm shadow-md">
                        <a href={`/product/${product._id}`}>
                            <div className="overflow-hidden rounded-sm">
                                <img src={product.img} alt={product.title} className="w-full h-[300px] object-cover transform hover:scale-110 transition-transform duration-300" />
                                <span className="absolute top-2 left-2 bg-gray-200 text-red-400 text-xs px-2 py-1 rounded">Sale</span>
                            </div>
                        </a>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleWishlist(product._id);
                            }}
                            className="absolute top-2 right-2 p-2"
                        >


                            <FontAwesomeIcon className={`w-4   ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'}`} icon={faHeart} />
                        </button>
                        <div className='ps-2'>
                            <div className="flex space-x-1 pt-2">
                                {product.color.map(color => (
                                    <button
                                        key={color}
                                        aria-label={`Select ${color}`}
                                        className='relative w-8 h-8 rounded-full border-2 border-gray hover:border-[2px] hover:border-gray-500 duration-75'
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    />
                                ))}
                            </div>
                            <h2 className="text-lg product-card__title text-start pt-3 font-semibold text-gray-900">
                                {product.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).substring(0, 20)}{product.title.length > 20 ? '...' : ''}
                            </h2>
                            <div className="flex justify-between items-center">
                                <p className="btn-2 text-black">AUSTRALIAN MADE</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Flashsell;
