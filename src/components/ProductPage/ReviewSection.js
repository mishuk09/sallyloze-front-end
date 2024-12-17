import React from 'react';

const reviews = [
    {
        name: "Lyndel C.",
        date: "14/08/24",
        title: "Light weight trousers",
        review:
            "I love them, great fit and so light, don’t crush easily. I now really really want the olive coloured pair as well.",
        rating: 5,
        product: "Relaxed Pant",
        helpful: 0,
    },
    {
        name: "Cecilia S.",
        date: "11/03/24",
        title: "Love these pants - easy to wear, lovely style",
        review:
            "I have also bought four pairs of these pants! Light, easy to wear, lovely style. My jeans have been relegated to the back burner throughout our Perth summer in favour of these beautiful pants.",
        rating: 5,
        product: "Relaxed Pant",
        helpful: 0,
    },
    {
        name: "Catherine",
        date: "01/11/23",
        title: "Light and simple nice little pockets",
        review:
            "Light and simple nice little pockets... thought I was buying slightly heavier ones I'd had before but these will be a good work and general summer and longer basic.",
        rating: 5,
        product: "Relaxed Pant",
        helpful: 0,
    },
    {
        name: "Susie B.",
        date: "18/09/23",
        title: "My 4th pair so",
        review: "My 4th pair so that says it all.",
        rating: 4,
        product: "Relaxed Pant",
        helpful: 0,
    },
];

const ReviewSection = () => {
    return (
        <div className="p-6 mt-14 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center border-b pb-6 flex flex-col sm:flex-row justify-center items-center">
                <p className="text-2xl flex items-center mb-4 sm:mb-0">
                    <span>4.8</span>
                    <div className="text-start text-sm ms-3">
                        <span>⭐⭐⭐⭐⭐</span><br />
                        <span> Based on 4 reviews</span>
                    </div>
                </p>
                <p className="sm:ms-10">
                    <button className="px-4 py-2 rounded-full review-btn   ">
                        Write A Review
                    </button>
                </p>
            </div>

            {/* Reviews */}
            <div className="mt-6">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="border-b pb-4 mb-4 grid grid-cols-1 sm:grid-cols-6 gap-4"
                    >
                        {/* User Info */}
                        <div className="sm:col-span-1 flex space-x-4 pt-2 ">
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-white font-bold">
                                    {review.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </span>
                            </div>
                            <div>
                                <h2 className="font-bold">{review.name}</h2>
                                <span className="text-xs text-gray-500">Verified Buyer</span>
                            </div>
                        </div>

                        {/* Review Content */}
                        <div className="sm:col-span-4">
                            <h3 className="mt-2 font-semibold">{review.title}</h3>
                            <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                            <p className="text-gray-700">{review.review}</p>
                            <p className="text-gray-500 text-sm mt-2">
                                Product Reviewed: <span className="text-black">{review.product}</span>
                            </p>
                            <div className="mt-4 text-sm text-gray-500 flex items-center space-x-4">
                                <span>Was this review helpful?</span>
                                <button className="flex items-center text-gray-600 space-x-1 hover:text-blue-600">
                                    <span>👍</span> <span>{review.helpful}</span>
                                </button>
                                <button className="flex items-center text-gray-600 space-x-1 hover:text-blue-600">
                                    <span>👎</span> <span>{review.helpful}</span>
                                </button>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="sm:col-span-1 flex sm:items-start sm:justify-end items-center justify-center">
                            <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;
