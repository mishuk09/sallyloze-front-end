import * as axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MadeBy from '../MadeBy/MadeBy';

const Offerdiv = () => {
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

    const renderSkeleton = () => (
        Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="relative bg-gray-200 rounded-sm shadow-md animate-pulse">
                <div className="w-full h-[200px] md:h-[250px] lg:h-[350px] bg-gray-300" />
                <div className="p-2">
                    <div className="flex space-x-2 mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300" />
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300" />
                    </div>
                    <div className="w-3/4 h-4 bg-gray-300 mb-2" />
                    <div className="w-1/2 h-4 bg-gray-300" />
                </div>
            </div>
        ))
    );

    return (
        <div className='offer-div pb-6'>
            <div className="text-center items-center">
                <h1 className="offer-div-title">Explore Up to 70% OFF</h1>
            </div>
            {loading ? (
                <div className="mt-6 container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {renderSkeleton()}
                </div>
            ) : (
                <Carousel
                    responsive={responsive}
                    infinite={false}
                    autoPlay={false}
                    itemClass="px-1 md:px-2"
                    containerClass="container mt-6 mx-auto px-0"
                >
                    {posts.map(product => (
                        <div key={product._id} className="relative bg-white rounded-sm shadow-md">
                            <a href={`/product/${product._id}`}>
                                <div className="overflow-hidden rounded-sm">
                                    <img src={product.img} alt={product.title}
                                        className="w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover transform hover:scale-110 transition-transform duration-300" />
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
                                <FontAwesomeIcon className={`w-4 ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'}`} icon={faHeart} />
                            </button>
                            <div className="p-2">
                                <div className="flex space-x-1 md:pt-2">
                                    {product.color.map(color => (
                                        <button
                                            key={color}
                                            aria-label={`Select ${color}`}
                                            className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray hover:border-gray-500 duration-75"
                                            style={{ backgroundColor: color.toLowerCase() }}
                                        />
                                    ))}
                                </div>
                                <h2 className="text-sm md:text-base product-card__title text-start md:pt-3 pt-1 font-semibold text-gray-900">
                                    {product.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).substring(0, 20)}{product.title.length > 20 ? '...' : ''}
                                </h2>
                                <div className="flex justify-between items-center">
                                    <MadeBy />
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default Offerdiv;
