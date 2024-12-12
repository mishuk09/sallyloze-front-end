import React from 'react';
import { Link } from 'react-router-dom';
 

const ShopbySize = () => {
    const sizes = {
        XS: { label: "XS", link: "/collection " },
        S: { label: "S", link: "/collection" },
        M: { label: "M", link: "/collection" },
        L: { label: "L", link: "/collection" },
        XL: { label: "XL", link: "/collection " },
        XXL: { label: "XXL", link: "/collection " },
        "3XL": { label: "3XL", link: "/collection " },
        "ALL": { label: "ALL", link: "/collection " }
    };

    return (
        <div>
            <div className="text-center items-center pt-10">
                <h1 className="text-3xl uppercase shop-by-size">SHOP BY SIZE</h1>
            </div>

            <div className="grid mt-14 mb-10 container grid-cols-4 gap-4">
                {Object.keys(sizes).map(size => (
                    <Link
                        key={size}
                        to={sizes[size].link} // Use the link from the sizes object
                        className="flex items-center justify-center p-2 text-4xl shop-btn rounded  transition duration-200"
                    >
                        {sizes[size].label} {/* Display the size label */}
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default ShopbySize;
