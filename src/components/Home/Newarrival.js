import * as axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import MadeBy from '../MadeBy/MadeBy';

const NewArrivals = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading status

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data.slice(0, 12));
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.log(error);
                setLoading(false); // Set loading to false even if there's an error
            });
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2
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

        // Update localStorage with the new wishlist state
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (savedWishlist) {
            setWishlist(savedWishlist);
        }
    }, []);

    return (
        <div className='new-arival pb-10'>
            <div className="text-center items-center pt-10">
                <h1 className="italic text-xl md:text-2xl lg:text-3xl">New Arrivals</h1>
            </div>
            <Carousel
                responsive={responsive}
                infinite={false}
                autoPlay={false}
                itemClass="px-1 md:px-2 "
                containerClass="container  mt-6 mx-auto px-0"
            >
                {loading
                    ? Array.from({ length: 15 }).map((_, index) => (
                        <div key={index} className="relative bg-white rounded-sm shadow-md">
                            <div className="overflow-hidden rounded-sm">
                                <Skeleton height={200} className="w-full" />
                            </div>
                            <div className="p-2">
                                <Skeleton width="80%" />
                                <div className="flex space-x-1 md:pt-2 pt-1">
                                    {Array.from({ length: 3 }).map((_, colorIndex) => (
                                        <Skeleton
                                            key={colorIndex}
                                            width={30}
                                            height={30}
                                            circle
                                        />
                                    ))}
                                </div>
                                <Skeleton width="50%" />
                            </div>
                        </div>
                    ))
                    : posts.map(product => (
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
        </div>
    );
};

export default NewArrivals;
