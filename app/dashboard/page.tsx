import React from 'react';
import BookingList from '@/components/BookingList';
const Page = () => {
    return (

        <div className='container mx-auto px-6 lg:px-42  flex flex-col items-center pt-12   '>
            <h2 className="text-3xl md:text-5xl font-bold mb-20">Booking Dashboard</h2>
            <BookingList />
        </div>

    );
};

export default Page;