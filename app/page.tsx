import BookingFrom from "@/components/BookingFrom";

export default function Home() {
  return (
    <div>
      <div className='container mx-auto px-6 lg:px-42  flex flex-col items-center pt-12  '>
        <h2 className="text-3xl md:text-5xl font-bold mb-10">Book Now</h2>
        <BookingFrom />
      </div>
    </div>
  );
}
