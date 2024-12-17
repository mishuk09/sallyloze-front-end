import React, { useState, useEffect } from "react";

const Newsletter = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popup, setPopup] = useState(false);

    const submitalert = () => {
        setPopup(true);
        setShowPopup(false);
        setTimeout(() => {
            setPopup(false);
        }, 3000)
    }

    // Function to check if 1 minute has passed
    const checkPopupTime = () => {
        const lastShown = localStorage.getItem("popupLastShown"); // Get the last shown timestamp
        const now = Date.now();

        // Show popup if:
        // - There's no stored time
        // - OR 1 minute (60,000 ms) has passed since the last show
        if (!lastShown || now - parseInt(lastShown) > 60000) {
            setShowPopup(true);
            localStorage.setItem("popupLastShown", now); // Update last shown time
        }
    };

    // Auto-hide the popup after 5 seconds
    useEffect(() => {
        checkPopupTime();

        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {popup && (
                <div className="fixed top-4 right-4   bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300">
                    Successfully Submitted!
                </div>
            )}

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
                    <div className="relative bg-white w-full max-w-lg rounded-lg shadow-2xl p-6 transform scale-100 transition-transform duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold transition duration-200"
                        >
                            &times;
                        </button>

                        {/* Content */}
                        <div className="text-center">

                            {/* Title */}
                            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
                                Join Our Newsletter 🎉
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Subscribe and get exclusive updates, resources, and offers directly to your inbox.
                            </p>

                            {/* Input and Button */}
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full sm:w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                                />
                                <button
                                    onClick={submitalert}
                                    className="w-full sm:w-1/4 px-4 py-2 subscribe-btn rounded-md   "
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Newsletter;
