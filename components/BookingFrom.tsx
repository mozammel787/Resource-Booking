"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
import axios, { AxiosError } from "axios"


export default function BookingFrom() {
  const [error, setError] = React.useState<string>("")
  const [success, setSuccess] = React.useState<boolean>(false)
  const [resource, setResource] = React.useState<string>("")
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [timeFrom, setTimeFrom] = React.useState("09:00")
  const [timeTo, setTimeTo] = React.useState("10:00")
  const [requested, setRequested] = React.useState<string>("")

  const formattedDate = date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0] : null;




  React.useEffect(() => {

    const now = new Date();
    const durationMinutes = (((new Date(`${date?.toDateString()} ${timeTo}`)).getTime()) - (new Date(`${date?.toDateString()} ${timeFrom}`)).getTime()) / (1000 * 60);
    const selectedStartTime = new Date(`${date?.toDateString()} ${timeFrom}`);


    if (!requested) {
      setError("Please enter your name");
    } else if (!resource) {
      setError("Please select a resource");
    } else if (!date) {
      setError("Please select a date");
    } else if (!timeFrom || !timeTo) {
      setError("Please select a time range");
    } else if (new Date(`${date.toDateString()} ${timeFrom}`) >= new Date(`${date.toDateString()} ${timeTo}`)) {
      setError("End time must be after start time");
    } else if (durationMinutes < 15) {
      setError("Time range must be at least 15 minutes");
    } else if (durationMinutes > 120) {
      setError("Time range cannot exceed 2 hours");
    } else if (
      date?.toDateString() === now.toDateString() &&
      selectedStartTime < now
    ) {
      setError("You cannot book for a past time today");
    }
    else {
      setError("");
    }
  }, [resource, requested, date, timeFrom, timeTo]);



  const handleSubmit = async () => {

    try {
      const response = await axios.post("https://resource-booking-server.vercel.app/bookings", {
        requestedBy: requested,
        resource: resource,
        date: formattedDate,
        timeFrom: timeFrom,
        timeTo: timeTo
      });

      setResource("");
      setRequested("");
      setTimeFrom("09:00");
      setTimeTo("10:00");
      setDate(undefined);
      setSuccess(true)

      console.log("Response:", response.data);

    } catch (error: unknown) {
      const err = error as AxiosError;

      const msg =
        (err.response?.data as { message?: string })?.message || "Unknown error";

      if (err.response?.status === 400) {
        setError(msg);
      }

      console.log(err.response?.status);
    }


  }

  React.useEffect(() => {
  if (success) {
    const timer = setTimeout(() => setSuccess(false), 3000);
    return () => clearTimeout(timer);
  }
}, [success]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col  gap-2 ">
        <span >Requested By:</span>
        <Input value={requested} onChange={(e) => setRequested(e.target.value)} placeholder="Enter your name" />
      </div>
      <div className="flex flex-col  gap-2 ">
        <span >Selected Resource :</span>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start font-normal text-gray-500 ">{resource || "Select Resource"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[400px]">
            <DropdownMenuLabel>Resource List</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={resource} onValueChange={setResource}>
              <DropdownMenuRadioItem value="Conference Hall">Conference Hall</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Training Room">Training Room</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Interview Room">Interview Room</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Meeting Room">Meeting Room</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Focus Room">Focus Room</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card className="py-4">
        <span className="mb-4 text-center">Pick a Date and Time:</span>
        <CardContent className="px-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{
              before: new Date(),
            }}
            className="bg-transparent p-0 [--cell-size:--spacing(10.5)] w-[440px] "
          />
        </CardContent>
        <CardFooter className="flex gap-2 border-t px-4 !pt-4 *:[div]:w-full">
          <div>
            <Label htmlFor="time-from" className="sr-only">
              Start Time
            </Label>
            <Input
              onChange={(e) => setTimeFrom(e.target.value)}
              id="time-from"
              type="time"
              step="1"
              defaultValue={timeFrom}
              className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
          <span>-</span>
          <div>
            <Label htmlFor="time-to" className="sr-only">
              End Time
            </Label>
            <Input
              onChange={(e) => setTimeTo(e.target.value)}
              id="time-to"
              type="time"
              step="1"
              defaultValue={timeTo}
              className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </CardFooter>
      </Card>
      <Button
        className={`cursor-pointer ${error ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleSubmit}
        disabled={!!error} // disables button when there's an error
      >
        Book Now
      </Button>

      {((resource || requested || date) && error  ) && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertDescription>
            <p className="text-wrap w-[420px]">{error}</p>
          </AlertDescription>
        </Alert>
      )}
      {(success ) &&
        <Alert className="text-green-500">
          <CheckCircle2Icon />
          <AlertDescription className="text-green-500">
            Booked Resource successfully.
          </AlertDescription>
        </Alert>
      }


    </div>
  )
}
