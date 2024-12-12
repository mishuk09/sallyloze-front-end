import React, { useState } from 'react';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null); // Tracks which FAQ is open

    // Toggle FAQ visibility
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Close if the same FAQ is clicked
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {/* FAQ 1 */}
                <div className="p-4 border rounded-md bg-gray-50">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(0)}>
                        <h3 className="font-semibold mb-2">What is your return policy?</h3>
                        <span>{activeIndex === 0 ? '-' : '+'}</span> {/* Toggle plus/minus */}
                    </div>
                    {activeIndex === 0 && (
                        <p>You can return any item within 30 days of purchase. Make sure the item is in its original condition.</p>
                    )}
                </div>

                {/* FAQ 2 */}
                <div className="p-4 border rounded-md bg-gray-50">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(1)}>
                        <h3 className="font-semibold mb-2">How can I track my order?</h3>
                        <span>{activeIndex === 1 ? '-' : '+'}</span>
                    </div>
                    {activeIndex === 1 && (
                        <p>Once your order is shipped, you will receive a tracking number via email. Use this number on our tracking page to see your order status.</p>
                    )}
                </div>

                {/* FAQ 3 */}
                <div className="p-4 border rounded-md bg-gray-50">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(2)}>
                        <h3 className="font-semibold mb-2">Do you offer international shipping?</h3>
                        <span>{activeIndex === 2 ? '-' : '+'}</span>
                    </div>
                    {activeIndex === 2 && (
                        <p>Yes, we ship to most countries worldwide. Shipping costs and times vary depending on the destination.</p>
                    )}
                </div>

                {/* FAQ 4 */}
                <div className="p-4 border rounded-md bg-gray-50">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(3)}>
                        <h3 className="font-semibold mb-2">Can I cancel or change my order?</h3>
                        <span>{activeIndex === 3 ? '-' : '+'}</span>
                    </div>
                    {activeIndex === 3 && (
                        <p>You can cancel or change your order within 24 hours of placing it. Please contact our customer service team for assistance.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
