import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heart from '../img/heart (2).png';
import dash from '../img/dashboard.png';
import logout from '../img/logout.png';
import pack from '../img/package (3).png';
import pin from '../img/pin.png';
import user from '../img/user.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("tab1");
    const [editFormVisible, setEditFormVisible] = useState(null);
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        mobile: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Function to toggle the edit form visibility
    const toggleEditForm = (formType) => {
        // If the formType is already visible, close it; otherwise, open the corresponding form
        if (editFormVisible === formType) {
            setEditFormVisible(null); // Close the form
        } else {
            setEditFormVisible(formType); // Open the selected form
        }
    };


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            try {
                const response = await axios.get('https://sneakers-backend-1.onrender.com/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(response.data.profile);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/signin');
                }
            }
        };

        fetchData();
    }, [navigate]);


    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.id]: e.target.value,
        });
    };


    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                'https://sneakers-backend-1.onrender.com/update-profile',
                {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    gender: profile.gender,
                    email: profile.email,
                    mobile: profile.mobile,
                    newPassword: profile.newPassword === profile.confirmPassword ? profile.newPassword : null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <div className="min-h-screen flex flex-col   px-4">

            <main className="flex-grow container mx-auto px-4  ">
                <div className="shop-head border-b h-[120px] sm:h-[120px] flex items-center text-center justify-center relative">
                    <div className="flex relative shop-h-text custom-container flex-col h-auto w-full text-center justify-center">
                        <p className="text-[20px] sm:text-[26px] lg:text-[30px] font-bold">My Account</p>
                        <span className="text-center text-[12px] cart-access lg:text-[14px]">
                            <span>Home /</span> Account
                        </span>
                    </div>
                    <div className="overlay1"></div>
                </div>

                <div className="tabs custom-container  profile-head">

                    <div className="dashbord-parent md:px-1 lg:px-3 bg-white">
                        <div className="tab-links h-[200px] grid rounded">
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab1" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab1")}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={user} alt="" /> Profile</div>
                            </div>
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab2" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab2")}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={pack} alt="" /> Orders</div>
                            </div>
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab3" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab3")}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={pin} alt="" />Your Address</div>
                            </div>
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab4" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab4")}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={heart} alt="" />Your Wishlist</div>
                            </div>
                            <div
                                className="flex items-center text-center cursor-pointer p-2 rounded   text-black"
                                onClick={handleLogout}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={logout} alt="" />Log Out</div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-content-2 bg-white mb-[100px] md:border-l">
                        {activeTab === "tab1" && (
                            <div className="tab">
                                <h2 className="text-gray-600">Welcome <span className="font-semibold">{profile.lastName}</span></h2>

                                <p className="text-[18px] font-medium mt-7">Personal Information</p>
                                <div className="mb-8">
                                    <div className="sm:flex gap-6 personal-input text-[14px] mt-3">
                                        <input
                                            className="border outline-none px-2"
                                            placeholder="First Name"
                                            type="text"
                                            id="firstName"
                                            value={profile.firstName}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="border outline-none mt-4 sm:mt-0 px-2"
                                            placeholder="Last Name"
                                            type="text"
                                            id="lastName"
                                            value={profile.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <p className="text-[18px] font-medium">Your Gender</p>
                                <div className="flex gap-4 mt-3">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={profile.gender === 'Male'}
                                            onChange={() => setProfile({ ...profile, gender: 'Male' })}
                                        /> Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={profile.gender === 'Female'}
                                            onChange={() => setProfile({ ...profile, gender: 'Female' })}
                                        /> Female
                                    </label>
                                </div>

                                <p className="text-[18px] font-medium mt-8">Email Address</p>
                                <input
                                    className="border outline-none px-2 mt-3"
                                    placeholder="Email"
                                    type="email"
                                    id="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                />

                                <p className="text-[18px] font-medium mt-8">Mobile Number</p>
                                <input
                                    className="border outline-none px-2 mt-3"
                                    placeholder="Mobile Number"
                                    type="text"
                                    id="mobile"
                                    value={profile.mobile}
                                    onChange={handleChange}
                                />

                                <p className="text-[18px] font-medium mt-8">Reset Password</p>
                                <input
                                    className="border outline-none px-2 mt-3"
                                    placeholder="New Password"
                                    type="password"
                                    id="newPassword"
                                    value={profile.newPassword}
                                    onChange={handleChange}
                                />
                                <input
                                    className="border outline-none px-2 mt-3"
                                    placeholder="Confirm New Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={profile.confirmPassword}
                                    onChange={handleChange}
                                />

                                <button onClick={handleSave} className="mt-4">Save</button>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;



















import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Collection = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || {});


    // Fetch posts on mount
    useEffect(() => {
        axios.get('https://sneakers-backend-1.onrender.com/posts')
            .then(response => {
                setPosts(response.data);
                setFilteredPosts(response.data); // Initial set to show all products
            })
            .catch(error => console.log(error));
    }, []);


    const toggleFilterPanel = () => {
        setFilterOpen(!filterOpen);
    };

    const handleWishlist = (productId) => {
        const updatedWishlist = { ...wishlist, [productId]: !wishlist[productId] };
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };



    return (
        <div className="container collection pb-10">
            <div className="text-center pt-10">
                <p className="text-lg font-semibold text-start pl-4">Collections / Weekend Edit</p>
                <h1 className="text-3xl italic font-bold mt-2 text-start pl-4">Weekend Edit</h1>
                <div className="flex justify-start gap-8 mt-4 pl-4">
                    <button onClick={toggleFilterPanel} className="text-gray-500 hover:text-black">Filter</button>
                </div>
            </div>
            <div className="flex">
                {filterOpen && (
                    <div className="w-64 bg-gray-100 p-4 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Filter Options</h2>

                        {/* Color Filter */}
                        <div className="mb-4">
                            <label className="block mb-2">Color</label>
                            {['black', 'blue', 'red'].map(color => (
                                <label key={color} className="block">
                                    <input
                                        type="checkbox"
                                        checked={filters.color.includes(color)}
                                        onChange={() => handleCheckboxChange('color', color)}
                                    />
                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                </label>
                            ))}
                        </div>

                        {/* Price Range Filter */}
                        <div className="mb-4">
                            <label className="block mb-2">Price Range</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="50"
                                value={filters.priceRange[1]}
                                onChange={(e) => handlePriceChange(e.target.value)}
                                className="w-full"
                            />
                            <p className="text-sm">Up to ${filters.priceRange[1]}</p>
                        </div>

                        {/* Type Filter */}
                        <div className="mb-4">
                            <label className="block mb-2">Type</label>
                            {['blouse', 'jumper'].map(type => (
                                <label key={type} className="block">
                                    <input
                                        type="checkbox"
                                        checked={filters.type.includes(type)}
                                        onChange={() => handleCheckboxChange('type', type)}
                                    />
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </label>
                            ))}
                        </div>
                        {/* Additional filters can be added similarly */}
                    </div>
                )}

                {/* Products Grid */}
                <div className="container grid grid-cols-4 mt-6 mx-auto gap-6 px-4">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(product => (
                            <div key={product._id} className="relative bg-white rounded-sm shadow-md">
                                <Link to={`/product/${product._id}`}>
                                    <div className="overflow-hidden rounded-sm">
                                        <img src={product.img} alt={product.title} className="w-full h-[350px] object-cover transform hover:scale-110 transition-transform duration-300" />
                                        <span className="absolute top-2 left-2 bg-gray-200 text-red-400 text-xs px-2 py-1 rounded">Sale</span>
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleWishlist(product._id);
                                    }}
                                    className="absolute top-2 right-2 p-2"
                                >
                                    <FontAwesomeIcon className={`w-4 ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'}`} icon={faHeart} />
                                </button>
                                <div className="ps-2">
                                    <div className="flex space-x-1 pt-2">
                                        {product.color.map(color => (
                                            <button
                                                key={color}
                                                aria-label={`Select ${color}`}
                                                className="relative w-8 h-8 rounded-sm border-2 border-gray hover:border-[3px] hover:border-white duration-75"
                                                style={{ backgroundColor: color.toLowerCase() }}
                                            />
                                        ))}
                                    </div>
                                    <h2 className="text-lg product-card__title text-start pt-3 font-semibold text-gray-900">
                                        {product.title}
                                    </h2>
                                    <div className="flex space-x-2 py-3">
                                        <span className="text-md font-semibold">{`৳${product.price}`}</span>
                                        {product.compare_at && <span className="text-gray-500 text-sm line-through">{`৳${product.compare_at}`}</span>}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-4">No products found with the selected filters.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;
