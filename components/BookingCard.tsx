import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDateRange } from "little-date";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface BookingEvent {
  _id: number;
  resource?: string;
  timeFrom?: string;
  timeTo?: string;
  date?: string;
  requestedBy?: string;
}

const BookingCard = ({ event, handleDelete }: { event: BookingEvent; handleDelete: (id: number) => void; }) => {
  const { _id, resource, timeFrom, timeTo, date, requestedBy } = event;

  const dateFrom = new Date(`${date}T${timeFrom}`);
  const dateTo = new Date(`${date}T${timeTo}`);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    if (now < dateFrom) {
      setStatus("Upcoming");
    } else if (now >= dateFrom && now <= dateTo) {
      setStatus("Ongoing");
    } else {
      setStatus("Past");
    }
  }, [dateFrom, dateTo]);


  return (
    <div
      key={_id}
      className={`relative rounded-md p-2 pl-6 text-sm bg-muted after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full flex  justify-between items-center gap-1 w-64 shadow hover:shadow-md  ${resource === "Conference Hall" ? "after:bg-green-600" : resource === "Training Room" ? "after:bg-blue-500" : resource === "Interview Room" ? "after:bg-purple-500" : resource === "Meeting Room" ? "after:bg-black" : "after:bg-yellow-500"}`}
    >
      <div className="space-y-1">
        <Badge className={`${status === "Upcoming" ? "bg-blue-500/10 text-blue-600 border border-blue-200" : status === "Ongoing" ? "bg-green-500/10 text-green-600 border border-green-200" : "bg-black/10 text-gray-500 border border-black/10"}`}>{status}</Badge>
        <div className="font-medium">{resource}</div>
        <div className="text-muted-foreground text-xs">
          Requested by: {requestedBy}
        </div>
        <div className="text-muted-foreground text-xs">
          {formatDateRange(dateFrom, dateTo)}
        </div>

      </div>
      <Button onClick={() => handleDelete(_id)} className="rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer "><Trash2 /></Button>
    </div>
  );
};

export default BookingCard;
