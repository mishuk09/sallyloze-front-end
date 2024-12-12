import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Trouser = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://sneakers-backend-1.onrender.com/posts')
            .then(response => {
                const filteredPosts = response.data.filter(post => post.category === 'trouser');
                setPosts(filteredPosts);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
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
        <div className="container mx-auto px-4 lg:px-0">
            <h1 className="text-2xl text-center mt-16 mb-10 font-bold">Trouser</h1>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                </div>
            )}
        </div>
    );
};

export default Trouser;
