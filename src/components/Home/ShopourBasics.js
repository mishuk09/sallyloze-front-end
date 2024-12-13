import * as axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ShopourBasic = () => {
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
            items: 1
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
        // Sync state with localStorage on component mount
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (savedWishlist) {
            setWishlist(savedWishlist);
        }
    }, []);

    return (
        <div className='new-arival mt-6 pb-10'>
            <div className="text-center items-center pt-10">
                <h1 className="text-3xl ">Shop our Basics
                </h1>
            </div>
            <Carousel
                responsive={responsive}
                infinite={false}
                autoPlay={false}
                itemClass="px-2"
                containerClass="container mt-6 mx-auto px-4"
            >
                {posts.map(product => (
                    <div key={product._id} className="relative  bg-white rounded-sm shadow-md">
                        <a href={`/product/${product._id}`}>
                            <div className="overflow-hidden rounded-sm">
                                <img src={product.img} alt={product.title} className="w-full h-[350px] object-cover transform hover:scale-110 transition-transform duration-300" />
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
                            <div>
                                {/* <span className="line-through text-gray-500">${product.oldPrice}</span> Optional: to show the old price */}
                                <div>
                                    <span className="text-xl font-semibold">${product.newPrice}</span>
                                    <sup className="text-sm text-gray-800"> 99</sup> {/* Optional: you can add a label or just keep the sup with price */}
                                </div>
                            </div>
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

export default ShopourBasic;
