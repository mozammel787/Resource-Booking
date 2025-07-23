import React from 'react';
import BookingList from '@/components/BookingList';
const Page = () => {
    return (

        <div className='container mx-auto p-4  flex flex-col items-center pt-12   '>
            <h2 className="text-5xl font-bold mb-20">Booking Dashboard</h2>
            <BookingList />
        </div>

    );
};

export default Page;