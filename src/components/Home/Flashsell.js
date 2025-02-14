import * as axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MadeBy from '../MadeBy/MadeBy';

const Flashsell = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://sneakers-backend-1.onrender.com/posts')
            .then(response => {
                setPosts(response.data.slice(0, 12));
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
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
            items: 2
        }
    };

    const calculateTimeLeft = () => {
        const targetDate = new Date('2024-12-31T23:59:59');
        const difference = targetDate - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
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

        return () => clearInterval(timer);
    }, []);

    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem('wishlist')) || {}
    );

    const handleWishlist = (productId) => {
        const updatedWishlist = { ...wishlist, [productId]: !wishlist[productId] };
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (savedWishlist) {
            setWishlist(savedWishlist);
        }
    }, []);

    const SkeletonLoader = () => (
        <div className="relative bg-gray-200 rounded-sm shadow-md animate-pulse">
            <div className="w-full h-[200px] md:h-[250px] lg:h-[350px] bg-gray-300 rounded-sm"></div>
            <div className="p-2">
                <div className="flex space-x-1 md:pt-2">
                    {[1, 2, 3].map((key) => (
                        <div
                            key={key}
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300"
                        />
                    ))}
                </div>
                <div className="h-4 bg-gray-300 rounded-sm mt-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded-sm mt-2 w-1/2"></div>
            </div>
        </div>
    );

    return (
        <div className="offer-div mt-0 pb-6">
            <div className="flex container mx-auto justify-between items-center pt-10 lg:px-1">
                <h1 className="italic text-xl md:text-2xl lg:text-3xl">Flash Sell</h1>
                <div className="flex space-x-2 items-center">
                    <p className="">Offer ends:</p>
                    <div className="flex flex-col items-center">
                        <span className="font-semibold flash-sell px-1 py-0 lg:px-2 lg:py-1 text-gray-200">{timeLeft.hours || 0}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-semibold flash-sell px-1 py-0 lg:px-2 lg:py-1 text-gray-200">{timeLeft.minutes || 0}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-semibold flash-sell px-1 py-0 lg:px-2 lg:py-1 text-gray-200">{timeLeft.seconds || 0}</span>
                    </div>
                </div>
            </div>
            <Carousel
                responsive={responsive}
                infinite={false}
                autoPlay={false}
                itemClass="px-1 md:px-2"
                containerClass="container mt-6 mx-auto px-0"
            >
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => <SkeletonLoader key={index} />)
                    : posts.map((product) => (
                        <div key={product._id} className="relative bg-white rounded-sm shadow-md">
                            <a href={`/product/${product._id}`}>
                                <div className="overflow-hidden rounded-sm">
                                    <img
                                        src={product.img}
                                        alt={product.title}
                                        className="w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover transform hover:scale-110 transition-transform duration-300"
                                    />
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
                                <FontAwesomeIcon
                                    className={`w-4 ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'
                                        }`}
                                    icon={faHeart}
                                />
                            </button>
                            <div className="p-2">
                                <div className="flex space-x-1 md:pt-2">
                                    {product.color.map((color) => (
                                        <button
                                            key={color}
                                            aria-label={`Select ${color}`}
                                            className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray hover:border-gray-500 duration-75"
                                            style={{ backgroundColor: color.toLowerCase() }}
                                        />
                                    ))}
                                </div>
                                <h2 className="text-sm md:text-base product-card__title text-start md:pt-3 pt-1 font-semibold text-gray-900">
                                    {product.title.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).substring(0, 20)}
                                    {product.title.length > 20 ? '...' : ''}
                                </h2>
                                <div className="flex justify-between items-center">
                                    <MadeBy />
                                </div>
                            </div>
                        </div>
                    ))}
            </Carousel>
        </div>
    );
};

export default Flashsell;
