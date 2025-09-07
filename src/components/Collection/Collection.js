import * as axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import filter from '../img/filter.svg';
import closefilter from '../img/close-outline.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';  // Don't forget to import the CSS

const Collection = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || {});
    const [filters, setFilters] = useState({
        color: [],
        priceRange: [0, 1000],
        type: [],
        size: []
    });
    const [loading, setLoading] = useState(true); // Added loading state

    // Fetch posts on mount
    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data);
                setFilteredPosts(response.data); // Initial set to show all products
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.log(error);
                setLoading(false); // Set loading to false if there's an error
            });
    }, []);

    const toggleFilterPanel = () => {
        setFilterOpen(!filterOpen);
    };

    const handleWishlist = (productId) => {
        const updatedWishlist = { ...wishlist, [productId]: !wishlist[productId] };
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const handleCheckboxChange = (filterType, value) => {
        const updatedFilters = { ...filters };
        const lowerValue = value.toLowerCase(); // Convert to lowercase
        if (updatedFilters[filterType].includes(lowerValue)) {
            updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== lowerValue);
        } else {
            updatedFilters[filterType].push(lowerValue);
        }
        setFilters(updatedFilters);
        applyFilters(updatedFilters);
    };

    const handlePriceChange = (value) => {
        const updatedFilters = { ...filters, priceRange: [0, value] };
        setFilters(updatedFilters);
        applyFilters(updatedFilters);
    };

    const applyFilters = (updatedFilters) => {
        let newFilteredPosts = posts;

        // Filter by color
        if (updatedFilters.color.length > 0) {
            newFilteredPosts = newFilteredPosts.filter(post =>
                post.color.some(color => updatedFilters.color.includes(color.toLowerCase())) // Convert to lowercase
            );
        }

        // Filter by price range
        newFilteredPosts = newFilteredPosts.filter(post =>
            post.newPrice <= updatedFilters.priceRange[1]
        );

        // Filter by type
        if (updatedFilters.type.length > 0) {
            newFilteredPosts = newFilteredPosts.filter(post =>
                updatedFilters.type.includes(post.category.toLowerCase()) // Convert to lowercase
            );
        }

        // Filter by size
        if (updatedFilters.size.length > 0) {
            newFilteredPosts = newFilteredPosts.filter(post =>
                post.size.some(size => updatedFilters.size.includes(size.toLowerCase())) // Convert to lowercase
            );
        }

        setFilteredPosts(newFilteredPosts);
    };

    return (
        <div className="container collection pb-10">
            <div className="text-center pt-6 pb-4 lg:pt-10">
                <p className=" text-center lg:text-start text-sm lg:text-base pl-4">Collections / Weekend Edit</p>
                {/* <h1 className="text-xl lg:text-3xl filter-tittle-3  font-bold mt-2 text-center lg:text-start pl-4">Weekend Edit</h1> */}
                <div className="flex justify-start gap-8 mt-2 mb-2 pl-4">
                    <button
                        onClick={toggleFilterPanel}
                        className="text-gray-500 items-center flex hover:text-black"
                    >
                        {filterOpen ? (
                            <div>
                                <img className="w-5 me-1" src={closefilter} alt="Close Filter" />
                            </div>
                        ) : (
                            <div>
                                <img className="w-5 me-1" src={filter} alt="Open Filter" />
                            </div>
                        )}
                        Filter
                    </button>

                </div>
            </div>
            <div className="flex">
                {filterOpen && (
                    // <div className="w-64 bg-white p-6 rounded-lg shadow-lg  h-full">
                    <div
                        className={`fixed top-0 left-0 h-full bg-white p-6 rounded-lg shadow-lg transition-transform transform 
                        ${filterOpen ? 'translate-x-0' : '-translate-x-full'} z-50 sm:relative sm:translate-x-0 sm:block sm:w-64 lg:w-64`}
                    >

                        <button
                            onClick={toggleFilterPanel}
                            className="absolute top-3 text-sm right-3 text-gray-500 hover:text-gray-700  font-semibold"
                        >
                            ✕
                        </button>

                        {/* Color Filter */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Color</label>
                            <div className="space-y-2">
                                {['black', 'blue', 'red'].map(color => (
                                    <label
                                        key={color}
                                        className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500 rounded mr-3"
                                            checked={filters.color.includes(color)}
                                            onChange={() => handleCheckboxChange('color', color)}
                                        />
                                        {color.charAt(0).toUpperCase() + color.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Price Range</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="50"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                value={filters.priceRange[1]}
                                onChange={(e) => handlePriceChange(e.target.value)}
                            />
                            <span className="block text-sm text-gray-600 mt-2">{`Up to $${filters.priceRange[1]}`}</span>
                        </div>

                        {/* Type Filter */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Type</label>
                            <div className="space-y-2">
                                {['new arrival', 'men', 'women', 'hoodie', 'sweat shirt', 'trouser', 'caps'].map(type => (
                                    <label
                                        key={type}
                                        className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500 rounded mr-3"
                                            checked={filters.type.includes(type)}
                                            onChange={() => handleCheckboxChange('type', type)}
                                        />
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Size</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['xxs', 'xs', 's', 'm', 'l', 'xl'].map(size => (
                                    <label
                                        key={size}
                                        className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500 rounded mr-3"
                                            checked={filters.size.includes(size)}
                                            onChange={() => handleCheckboxChange('size', size)}
                                        />
                                        {size.toUpperCase()}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                )}
                <div className="container grid grid-cols-2  h-full  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto px-4">
                    {loading ? (
                        // Display skeleton loading when data is being fetched
                        Array(15).fill(0).map((_, index) => (
                            <div key={index} className="relative h-full bg-white rounded-sm shadow-md">
                                <Skeleton height={200} width="100%" />
                                <div className="ps-2 pb-1">
                                    <Skeleton height={20} width="70%" />
                                    <Skeleton height={15} width="50%" />
                                </div>
                            </div>
                        ))
                    ) : filteredPosts.length > 0 ? (
                        filteredPosts.map(product => (
                            <div key={product._id} className="relative bg-white rounded-sm shadow-md">
                                <Link to={`/product/${product._id}`}>
                                    <div className="overflow-hidden rounded-sm">
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            className="w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover transform hover:scale-110 transition-transform duration-300"
                                        />
                                        <span className="absolute top-2 left-2 bg-gray-200 text-red-400 text-xs px-2 py-1 rounded">
                                            Sale
                                        </span>
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleWishlist(product._id);
                                    }}
                                    className="absolute top-2 right-2 p-2"
                                >
                                    <FontAwesomeIcon
                                        className={`w-4 ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'}`}
                                        icon={faHeart}
                                    />
                                </button>
                                <div className="ps-2 pb-1">
                                    <div className="flex space-x-1 pt-2">
                                        {product.color.map(color => (
                                            <button
                                                key={color}
                                                aria-label={`Select ${color}`}
                                                className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray hover:border-gray-500 duration-75"
                                                style={{ backgroundColor: color.toLowerCase() }}
                                            />
                                        ))}
                                    </div>
                                    <h2 className=" lg:text-lg product-card__title text-start pt-1 lg:pt-3 font-semibold text-gray-900">
                                        {product.title}
                                    </h2>
                                    <div>
                                        <span className=" lg:text-xl font-semibold">${product.newPrice}</span>
                                        <sup className="text-sm text-gray-800">99</sup>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full">No products found with the selected filters.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;