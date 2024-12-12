import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Popup = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show popup after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000); // Show after 3 seconds

        return () => clearTimeout(timer);
    }, []);



    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    return (
        <>
            {isVisible && (
                <div className='top-0 left-0 right-0 bg-black text-sm text-center text-white h-10 w-full z-50 flex justify-center items-center'>
                    <section id="shopify-section-sections--17125168906293__announcement-bar" className="shopify-section">
                        <div className='announcement-bar section color-custom-1'>
                            <div className='announcement-bar__outer-container container'>
                                <div className='announcement-bar__inner-container'>
                                    <div className='announcement-bar__center-panel'>
                                        <Slider {...sliderSettings}>
                                            <div>
                                                <a href='/outlet-store' className='announcement-bar__link'>
                                                    <p>OUTLET STORE - Up to 70% Off*</p>
                                                </a>
                                            </div>
                                            <div>
                                                <p>FREE Shipping Over $299*</p>
                                            </div>
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            )}
        </>
    );
};

export default Popup;
