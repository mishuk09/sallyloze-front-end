import React from 'react';

const ContactUs = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
            <p className="mb-4">For any inquiries or assistance, feel free to contact us using the information below:</p>
            <div className="flex w-full mt-10 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className='w-full'>
                    <h3 className="text-xl font-semibold mb-2">Address</h3>
                    <p>123 Main Street</p>
                    <p>City, State, 12345</p>
                </div>
                <div className='w-full'>
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p>(123) 456-7890</p>
                </div>
                <div className='w-full'>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p>info@example.com</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
