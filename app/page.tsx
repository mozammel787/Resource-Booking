import BookingFrom from "@/components/BookingFrom";

export default function Home() {
  return (
    <div>
      <div className='container mx-auto p-4  flex flex-col items-center   '>
        <h2 className='text-5xl font-bold text-gray-900 my-12'>Book Now</h2>
        <BookingFrom />
      </div>
    </div>
  );
}
