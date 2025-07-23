"use client"

import * as React from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import BookingCard from "./BookingCard"

type BookingEvent = {
  _id: number;
  resource: string;
  status: string;
  date?: string;
  timeFrom?: string;
  timeTo?: string;
};




export default function BookingList() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [bookings, setBookings] = React.useState<BookingEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = React.useState<BookingEvent[]>([]);
  const [resource, setResource] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState<boolean>(false);

  const formattedDate = date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0] : null;
  // console.log(formattedDate);

  // Load bookings

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://resource-booking-server.vercel.app/bookings")
      setBookings(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {


    fetchData()
  }, [])

  const groupedByResource = filteredEvents?.reduce((acc, event) => {
    const key = event.resource || "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {} as Record<string, BookingEvent[]>);

  // Apply filters


  React.useEffect(() => {

    const fetchAndFilterEvents = async () => {
      try {
        setLoading(true);
        let data = [...bookings]; // Start with all bookings

        // Apply resource filter
        if (resource) {
          data = data.filter(event => event.resource === resource);
        }

        // Apply date filter
        if (formattedDate) {
          data = data.filter(event => event.date === formattedDate);
        }

        // Apply status filter
        if (status) {
          const now = new Date();
          data = data.filter(event => {
            const startTime = new Date(`${event.date}T${event.timeFrom}`);
            const endTime = new Date(`${event.date}T${event.timeTo}`);

            if (status === "Upcoming") return now < startTime;
            if (status === "Ongoing") return now >= startTime && now <= endTime;
            if (status === "Past") return now > endTime;
            return true;
          });
        }

        setFilteredEvents(data);
      } catch (error) {
        console.error("Error filtering events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterEvents();
  }, [resource, formattedDate, status, bookings]);





  const handleDelete = async (_id: number) => {

    try {
      setLoading(true);
      const response = await axios.delete(`https://resource-booking-server.vercel.app/booking-delete/${_id}`)
    } catch (error) {
      console.error("Delete Fail", error)
    }
    finally {
      setLoading(false);
    }
    fetchData()
  }




  const handleClearFilters = () => {
    setResource("");
    setStatus("");
    setDate(undefined);
  };


  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full ">


      <div className="flex items-center justify-between w-full flex-wrap gap-2">
        <div>
          <DropdownMenu>
            <span className="mr-2">Filter by Resource :</span>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Resource</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Resource List</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={resource} onValueChange={setResource}>
                <DropdownMenuRadioItem value="">All Resources</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Conference Hall">Conference Hall</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Training Room">Training Room</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Interview Room">Interview Room</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Meeting Room">Meeting Room</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Focus Room">Focus Room</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>



        <div className="flex items-center gap-3">
          <span className="">
            Filter by Date :
          </span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date)
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>




        </div>

        <div>
          <DropdownMenu>
            <span className="mr-2">Filter by Status :</span>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">All Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Status List</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Upcoming">Upcoming</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Ongoing">Ongoing</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Past">Past</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          onClick={handleClearFilters}
          className="ml-2 text-xs bg-gray-100 hover:bg-gray-200"
          variant="outline"
          disabled={!resource && !status && !date}
        >
          Clear Filters
        </Button>

      </div>

      <Card className=" w-full flex flex-row  items-start p-0 border-0 shadow-none ">




        <CardFooter className="flex flex-col items-start  gap-3 p-0  w-full">
          <div className="flex w-full items-center justify-between px-1">
            <div>
              <h2 className="text-3xl font-semibold">Booking List</h2>
            </div>
            <div className="text-sm font-medium">
              {date?.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          {loading ? (
            <div className="loader absolute top-1/2 right-1/2"></div>

          ) : (
            <>

              {Object.keys(groupedByResource).length > 0 ? (
                Object.entries(groupedByResource).map(([resourceName, events]) => (
                  <div key={resourceName} className="w-full mb-4">
                    <h2 className="text-md font-semibold mb-2">{resourceName}</h2>
                    <div className="flex flex-wrap gap-4">
                      {events.map((event) => (
                        <BookingCard key={event._id} event={event} handleDelete={handleDelete} />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-xs">No bookings found.</div>
              )}
            </>
          )}
        </CardFooter>

      </Card>
    </div>
  )
}






// backEnd Filtering 



// React.useEffect(() => {
//   const fetchFilteredEvents = async () => {
//     try {

//       const response = await axios.get(`http://localhost:5000/resource/${resource}`);
//       setFilteredEvents(response.data);
//     } catch (error) {
//       console.error("Error fetching filtered events:", error);
//     }
//   };

//   fetchFilteredEvents();
// }, [resource]);


// React.useEffect(() => {
//   const fetchFilteredEvents = async () => {
//     try {

//       const response = await axios.get(`http://localhost:5000/resource/${formattedDate}`);
//       setFilteredEvents(response.data);
//     } catch (error) {
//       console.error("Error fetching filtered events:", error);
//     }
//   };

//   fetchFilteredEvents();
// }, [formattedDate]);




// React.useEffect(() => {
//   const filtered = bookings.filter((event) => {
//     // Status filter
//     const now = new Date();
//     const startTime = new Date(`${event.date}T${event.timeFrom}`);
//     const endTime = new Date(`${event.date}T${event.timeTo}`);

//     let matchStatus = true;
//     if (status === "Upcoming") matchStatus = now < startTime;
//     if (status === "Ongoing") matchStatus = now >= startTime && now <= endTime;
//     if (status === "Past") matchStatus = now > endTime;

//     return matchStatus;
//   });

//   setFilteredEvents(filtered);
// }, [bookings, resource, formattedDate, status]);

