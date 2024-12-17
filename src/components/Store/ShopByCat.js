import React from 'react';
import { Link } from 'react-router-dom';

const ShopByCat = () => {
    const categories = {

        tshirtMen: { label: "T-Shirt for Men", link: "/collection" },
        tshirtWomen: { label: "T-Shirt for Women", link: "/collection" },
        trouserMen: { label: "Trouser for Men", link: "/collection" },
        trouserWomen: { label: "Trouser for Women", link: "/collection" },
        capsMen: { label: "Caps ", link: "/collection" },
        all: { label: "All Categories", link: "/collection" }
    };

    return (
        <div>
            <div className="text-center items-center pt-10">
                <h1 className="text-xl md:text-3xl uppercase shop-by-size">SHOP BY CATEGORY</h1>
            </div>

            <div className="grid grid-cols-1 mt-14 mb-10 container lg:grid-cols-3 gap-4">
                {Object.keys(categories).map(category => (
                    <Link
                        key={category}
                        to={categories[category].link} // Use the link from the categories object
                        className="flex items-center justify-center p-2 text-xl md:text-3xl h-[80px] md:h-[120px] shop-btn rounded  transition duration-200"
                    >
                        {categories[category].label} {/* Display the category label */}
                    </Link>
                ))}
            </div>


            <div className="text-center items-center pt-6 pb-10">

                <a href='collection' className='h-10 text-xs md:text-base outlet-section-btn-2   py-2  mt-6 px-4    rounded-sm'>SHOP THE SELL</a>
            </div>


        </div>
    );
};

export default ShopByCat;
